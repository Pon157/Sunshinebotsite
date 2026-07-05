import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Track } from "../types";
import { ADMIN_PROFILES, ADDITIONAL_TRACKS } from "../data/mockData";

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playTrack: (track: Track, customQueue?: Track[]) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  queue: Track[];
  allTracks: Track[];
  addCustomTrack: (track: Track) => void;
  updateTrackBanner: (trackId: string, bannerUrl: string) => void;
  updateTrackSrc: (trackId: string, audioUrl: string) => void;
  deleteTrack: (trackId: string) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const ALL_TRACKS: Track[] = [];
ADMIN_PROFILES.forEach((admin) => {
  admin.music.forEach((track) => {
    if (!ALL_TRACKS.some((t) => t.id === track.id)) {
      ALL_TRACKS.push(track);
    }
  });
});
ADDITIONAL_TRACKS.forEach((track) => {
  if (!ALL_TRACKS.some((t) => t.id === track.id)) {
    ALL_TRACKS.push(track);
  }
});

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customTracks, setCustomTracks] = useState<Track[]>(() => {
    try {
      const saved = localStorage.getItem("sunshine_custom_tracks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [trackOverrides, setTrackOverrides] = useState<Record<string, Partial<Track>>>(() => {
    try {
      const saved = localStorage.getItem("sunshine_track_overrides");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const allTracks = React.useMemo(() => {
    const combined = [...ALL_TRACKS, ...customTracks];
    return combined.map((track) => {
      const override = trackOverrides[track.id];
      if (override) {
        return { ...track, ...override };
      }
      return track;
    });
  }, [customTracks, trackOverrides]);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.8);
  const [queue, setQueue] = useState<Track[]>(allTracks);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setQueue(allTracks);
    if (currentTrack) {
      const updated = allTracks.find(t => t.id === currentTrack.id);
      if (updated) {
        setCurrentTrack(updated);
      }
    }
  }, [allTracks]);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration || 0);
      }
    };

    const handleEnded = () => {
      handleNextTrack();
    };

    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioRef.current.addEventListener("ended", handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audioRef.current.removeEventListener("ended", handleEnded);
      }
    };
  }, []);

  const setVolume = (newVolume: number) => {
    const val = Math.max(0, Math.min(1, newVolume));
    setVolumeState(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const addCustomTrack = (track: Track) => {
    const newList = [...customTracks, track];
    setCustomTracks(newList);
    localStorage.setItem("sunshine_custom_tracks", JSON.stringify(newList));
  };

  const updateTrackBanner = (trackId: string, bannerUrl: string) => {
    const newOverrides = {
      ...trackOverrides,
      [trackId]: {
        ...(trackOverrides[trackId] || {}),
        bannerUrl
      }
    };
    setTrackOverrides(newOverrides);
    localStorage.setItem("sunshine_track_overrides", JSON.stringify(newOverrides));
  };

  const updateTrackSrc = (trackId: string, src: string) => {
    const newOverrides = {
      ...trackOverrides,
      [trackId]: {
        ...(trackOverrides[trackId] || {}),
        src
      }
    };
    setTrackOverrides(newOverrides);
    localStorage.setItem("sunshine_track_overrides", JSON.stringify(newOverrides));
  };

  const deleteTrack = (trackId: string) => {
    const newList = customTracks.filter((t) => t.id !== trackId);
    setCustomTracks(newList);
    localStorage.setItem("sunshine_custom_tracks", JSON.stringify(newList));
    
    if (currentTrack?.id === trackId) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  };

  const playTrack = (track: Track, customQueue?: Track[]) => {
    if (!audioRef.current) return;

    const resolvedTrack = allTracks.find((t) => t.id === track.id) || track;

    if (customQueue && customQueue.length > 0) {
      setQueue(customQueue);
    }

    if (currentTrack?.id === resolvedTrack.id) {
      if (isPlaying) {
        pauseTrack();
      } else {
        resumeTrack();
      }
      return;
    }

    audioRef.current.src = resolvedTrack.src;
    setCurrentTrack(resolvedTrack);
    setCurrentTime(0);
    setDuration(0);

    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Audio playback interrupted/failed:", error);
          setIsPlaying(false);
        });
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeTrack = () => {
    if (audioRef.current && currentTrack) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Audio resume failed:", error);
            setIsPlaying(false);
          });
      }
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleNextTrack = () => {
    if (!currentTrack || queue.length === 0) return;
    const currentIndex = queue.findIndex((t) => t.id === currentTrack.id);
    if (currentIndex === -1) {
      playTrack(queue[0]);
    } else if (currentIndex < queue.length - 1) {
      playTrack(queue[currentIndex + 1]);
    } else {
      playTrack(queue[0]);
    }
  };

  const handlePrevTrack = () => {
    if (!currentTrack || queue.length === 0) return;
    const currentIndex = queue.findIndex((t) => t.id === currentTrack.id);
    if (currentIndex === -1) {
      playTrack(queue[0]);
    } else if (currentIndex > 0) {
      playTrack(queue[currentIndex - 1]);
    } else {
      playTrack(queue[queue.length - 1]);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        playTrack,
        pauseTrack,
        resumeTrack,
        seek,
        setVolume,
        nextTrack: handleNextTrack,
        prevTrack: handlePrevTrack,
        queue,
        allTracks,
        addCustomTrack,
        updateTrackBanner,
        updateTrackSrc,
        deleteTrack,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
