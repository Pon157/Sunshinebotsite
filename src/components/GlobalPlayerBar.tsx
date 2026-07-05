import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Music,
  Maximize2,
  X
} from "lucide-react";
import { useAudio } from "../context/AudioContext";

// Utility to format seconds to mm:ss format
const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export const GlobalPlayerBar: React.FC = () => {
  const { 
    currentTrack, 
    isPlaying, 
    currentTime, 
    duration, 
    volume, 
    pauseTrack, 
    resumeTrack, 
    seek, 
    setVolume, 
    nextTrack, 
    prevTrack 
  } = useAudio();

  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.8);

  if (!currentTrack) return null;

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      resumeTrack();
    }
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0) {
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(parseFloat(e.target.value));
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed bottom-4 left-4 right-4 z-40 bg-white/40 text-orange-950 p-4 rounded-[2rem] shadow-2xl border border-white/50 backdrop-blur-xl max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
        id="global-player-bar-container"
      >
        {/* Track Details */}
        <div className="flex items-center space-x-3 w-full md:w-1/3 min-w-0" id="player-track-details">
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white/40 shrink-0 border border-white/30">
            <img 
              src={currentTrack.coverUrl} 
              alt={currentTrack.title} 
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover ${isPlaying ? "animate-spin-slow" : ""}`}
              style={{ animationDuration: "16s" }}
              id="player-track-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-ping" />
              </div>
            )}
          </div>
          <div className="text-left min-w-0 flex-1">
            <h4 className="text-sm font-black truncate text-orange-950 font-sans uppercase tracking-tight" id="player-track-title">
              {currentTrack.title}
            </h4>
            <p className="text-xs text-orange-900/80 font-semibold truncate" id="player-track-artist">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Media Controls & Seeker */}
        <div className="flex flex-col items-center gap-2 w-full md:w-2/5" id="player-playback-controls">
          {/* Action Row */}
          <div className="flex items-center space-x-4" id="player-buttons-row">
            <button
              onClick={prevTrack}
              className="p-1.5 text-orange-800 hover:text-orange-950 transition-colors hover:scale-105 active:scale-95"
              id="btn-player-prev"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={handlePlayPause}
              className="p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all hover:scale-110 active:scale-95 shadow-lg shadow-orange-500/20 flex items-center justify-center cursor-pointer"
              id="btn-player-playpause"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>
            <button
              onClick={nextTrack}
              className="p-1.5 text-orange-800 hover:text-orange-950 transition-colors hover:scale-105 active:scale-95"
              id="btn-player-next"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Scrubber / Seeker Bar */}
          <div className="flex items-center space-x-2.5 w-full text-xxs font-mono text-orange-900/80 font-bold" id="player-seeker-row">
            <span>{formatTime(currentTime)}</span>
            <div className="relative flex-1 group py-2" id="scrubber-slider-wrapper">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeekChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                id="player-scrubber-input"
              />
              {/* Backing Track */}
              <div className="w-full h-1 bg-orange-950/15 rounded-full relative overflow-hidden">
                {/* Colored Progress */}
                <div 
                  className="h-full bg-orange-600 rounded-full group-hover:bg-orange-500 transition-colors"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume & Utility Controllers */}
        <div className="hidden md:flex items-center space-x-4 justify-end w-full md:w-1/3" id="player-utility-controls">
          
          {/* Animated sound equalizer bar group to show audio is physically active */}
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-4 px-2" id="global-player-equalizer">
              <span className="w-0.5 bg-orange-600 rounded-sm animate-bar-1 origin-bottom" />
              <span className="w-0.5 bg-orange-600 rounded-sm animate-bar-2 origin-bottom" style={{ animationDelay: "0.15s" }} />
              <span className="w-0.5 bg-orange-600 rounded-sm animate-bar-3 origin-bottom" style={{ animationDelay: "0.05s" }} />
              <span className="w-0.5 bg-orange-600 rounded-sm animate-bar-4 origin-bottom" style={{ animationDelay: "0.2s" }} />
            </div>
          )}

          {/* Volume Control Group */}
          <div className="flex items-center space-x-2" id="volume-control-group">
            <button
              onClick={handleMuteToggle}
              className="text-orange-800 hover:text-orange-950 transition-colors"
              id="btn-volume-mute"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-orange-950/20 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none"
              id="volume-slider"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
