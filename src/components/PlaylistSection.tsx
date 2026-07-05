import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  Pause, 
  Search, 
  Music, 
  Volume2, 
  ListMusic, 
  Sparkles,
  User,
  Disc
} from "lucide-react";
import { useAudio } from "../context/AudioContext";
import { ADMIN_PROFILES } from "../data/mockData";
import { Track } from "../types";

export const PlaylistSection: React.FC = () => {
  const { 
    currentTrack, 
    isPlaying, 
    playTrack, 
    allTracks
  } = useAudio();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "admin" | "extra">("all");

  const adminTrackIds = useMemo(() => {
    const ids: string[] = [];
    ADMIN_PROFILES.forEach((admin) => {
      admin.music.forEach((track) => {
        ids.push(track.id);
      });
    });
    return ids;
  }, []);

  const filteredTracks = useMemo(() => {
    return allTracks.filter((track) => {
      const matchesSearch = 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;

      if (filterType === "all") return true;
      if (filterType === "admin") {
        return adminTrackIds.includes(track.id);
      }
      if (filterType === "extra") {
        return !adminTrackIds.includes(track.id);
      }
      return true;
    });
  }, [allTracks, searchQuery, filterType, adminTrackIds]);

  return (
    <div className="space-y-6 md:space-y-10 py-2 md:py-4 px-2 sm:px-4" id="playlist-section-wrapper">
      
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto space-y-2 md:space-y-3 px-2" 
        id="playlist-intro"
      >
        <h2 className="text-2xl md:text-3.5xl font-black tracking-tight text-orange-950 font-sans uppercase">
          Музыкальный плейлист Sunshine
        </h2>
        <p className="text-orange-900/80 text-xs md:text-sm leading-relaxed font-semibold">
          Единый центр прослушивания любимых композиций. Здесь собрана музыка всех старших 
          администраторов, а также наши фирменные фоновые треки для уюта и расслабления.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6" id="playlist-controls-container">
        
        <AnimatePresence mode="wait">
          {currentTrack ? (
            <motion.div 
              key={currentTrack.id}
              initial={{ opacity: 0, scale: 0.98, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-white/40 group bg-stone-900"
              id="now-playing-cinematic-banner"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={currentTrack.coverUrl} 
                  alt="" 
                  className="w-full h-full object-cover opacity-35 blur-2xl scale-125 select-none pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-950/95 via-orange-950/80 to-orange-950/40" />
              </div>

              <div className="relative z-10 p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6" id="banner-content-container">
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 shadow-lg border border-white/20 bg-stone-800">
                    <img 
                      src={currentTrack.coverUrl} 
                      alt={currentTrack.title} 
                      className={`w-full h-full object-cover select-none pointer-events-none ${isPlaying ? "animate-spin-slow" : ""}`}
                      style={{ animationDuration: "14s" }}
                    />
                    {isPlaying && (
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        <span className="w-3 h-3 bg-orange-500 rounded-full animate-ping" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <span className="px-2 py-0.5 bg-orange-500 text-white font-black text-[9px] tracking-wider uppercase rounded-md shadow-sm">
                        СЕЙЧАС ИГРАЕТ
                      </span>
                      {adminTrackIds.includes(currentTrack.id) && (
                        <span className="px-2 py-0.5 bg-white/20 text-white font-black text-[9px] tracking-wider uppercase rounded-md">
                          Админ-трек
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg md:text-2xl font-black text-white uppercase tracking-tight line-clamp-1">
                      {currentTrack.title}
                    </h3>
                    <p className="text-orange-200/90 text-xs sm:text-sm font-semibold line-clamp-1">
                      {currentTrack.artist}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-end gap-1 h-5 px-3 py-1 bg-white/10 rounded-xl border border-white/10" id="soundwave-indicator">
                    <span className={`w-0.5 bg-orange-400 rounded-full origin-bottom ${isPlaying ? "animate-bar-1" : "h-1"}`} />
                    <span className={`w-0.5 bg-orange-400 rounded-full origin-bottom ${isPlaying ? "animate-bar-2" : "h-1"}`} style={{ animationDelay: "0.15s" }} />
                    <span className={`w-0.5 bg-orange-400 rounded-full origin-bottom ${isPlaying ? "animate-bar-3" : "h-1"}`} style={{ animationDelay: "0.3s" }} />
                    <span className={`w-0.5 bg-orange-400 rounded-full origin-bottom ${isPlaying ? "animate-bar-4" : "h-1"}`} style={{ animationDelay: "0.45s" }} />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-white/15 backdrop-blur-md p-5 md:p-6 rounded-2xl md:rounded-3xl border border-white/30 text-center space-y-2"
              id="now-playing-empty-banner"
            >
              <Music className="w-6 h-6 md:w-8 md:h-8 text-orange-800/50 mx-auto" />
              <h4 className="font-extrabold text-orange-950 text-sm uppercase tracking-tight">
                Выберите трек для прослушивания
              </h4>
              <p className="text-xxs sm:text-xs text-orange-900/80 font-semibold max-w-sm mx-auto leading-relaxed">
                Нажмите воспроизведение на любой дорожке из списка ниже, чтобы активировать плеер.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white/20 backdrop-blur-lg p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-white/40 shadow-md" id="playlist-search-and-filter">
          
          <div className="relative w-full sm:max-w-xs" id="search-bar-container">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-orange-900/60">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Поиск трека или автора..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/40 border border-white/30 rounded-xl text-xs sm:text-sm text-orange-950 placeholder-orange-900/50 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all font-semibold"
              id="playlist-search-input"
            />
          </div>

          <div className="flex gap-1 bg-white/20 p-1 rounded-xl border border-white/25 w-full sm:w-auto overflow-x-auto" id="playlist-filter-tabs">
            <button
              onClick={() => setFilterType("all")}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                filterType === "all"
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-orange-900 hover:text-orange-950 hover:bg-white/10"
              }`}
              id="tab-filter-all"
            >
              Все ({allTracks.length})
            </button>
            <button
              onClick={() => setFilterType("admin")}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                filterType === "admin"
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-orange-900 hover:text-orange-950 hover:bg-white/10"
              }`}
              id="tab-filter-admin"
            >
              Админы
            </button>
            <button
              onClick={() => setFilterType("extra")}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                filterType === "extra"
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-orange-900 hover:text-orange-950 hover:bg-white/10"
              }`}
              id="tab-filter-extra"
            >
              Доп. треки
            </button>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-lg rounded-2xl md:rounded-3xl border border-white/40 shadow-xl overflow-hidden" id="pooled-tracks-card">
          <div className="p-3 sm:p-4 border-b border-white/20 bg-white/30 flex items-center justify-between text-[10px] sm:text-xs font-bold text-orange-950 uppercase tracking-wider" id="playlist-stat-header">
            <span className="flex items-center gap-1.5">
              <ListMusic className="w-4 h-4 sm:w-5 sm:h-5 text-orange-700" />
              СПИСОК ДОСТУПНЫХ ТРЕКОВ
            </span>
            <span>НАЙДЕНО: {filteredTracks.length}</span>
          </div>

          {filteredTracks.length > 0 ? (
            <div className="divide-y divide-white/10" id="pooled-tracks-list">
              {filteredTracks.map((track, index) => {
                const isCurrentPlayingThis = currentTrack?.id === track.id;
                return (
                  <motion.div
                    key={track.id}
                    layoutId={`playlist-row-${track.id}`}
                    onClick={() => playTrack(track, filteredTracks)}
                    className={`p-3 sm:p-4 flex items-center justify-between transition-all cursor-pointer group active:scale-[0.99] select-none ${
                      isCurrentPlayingThis 
                        ? "bg-orange-500/10 hover:bg-orange-500/15" 
                        : "hover:bg-white/20"
                    }`}
                    id={`playlist-row-${track.id}`}
                  >
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      
                      <div className="w-6 text-center text-xs font-mono text-orange-900/60 flex items-center justify-center font-bold">
                        {isCurrentPlayingThis && isPlaying ? (
                          <div className="flex items-end gap-0.5 h-3 w-3" id="index-soundwave-anim">
                            <span className="w-0.5 bg-orange-700 rounded-sm animate-bar-1 origin-bottom" />
                            <span className="w-0.5 bg-orange-700 rounded-sm animate-bar-2 origin-bottom" />
                            <span className="w-0.5 bg-orange-700 rounded-sm animate-bar-3 origin-bottom" />
                          </div>
                        ) : (
                          <span className="group-hover:hidden">{index + 1}</span>
                        )}
                        <span className="hidden group-hover:inline-block text-orange-700">
                          {isCurrentPlayingThis && isPlaying ? (
                            <Pause className="w-3.5 h-3.5 fill-current" />
                          ) : (
                            <Play className="w-3.5 h-3.5 fill-current" />
                          )}
                        </span>
                      </div>

                      <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-stone-100 shadow-inner shrink-0 border border-white/20">
                        <img
                          src={track.coverUrl}
                          alt=""
                          referrerPolicy="no-referrer"
                          className={`w-full h-full object-cover select-none pointer-events-none ${isCurrentPlayingThis && isPlaying ? "animate-spin-slow" : ""}`}
                          style={{ animationDuration: "12s" }}
                        />
                        <div className="absolute inset-0 bg-black/5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className={`text-xs sm:text-sm font-extrabold truncate ${isCurrentPlayingThis ? "text-orange-900" : "text-orange-950"}`}>
                          {track.title}
                        </h4>
                        <p className="text-[10px] sm:text-xs text-orange-900/75 truncate mt-0.5 font-semibold">
                          {track.artist}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      {adminTrackIds.includes(track.id) ? (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-orange-500/10 text-orange-950 font-black rounded-lg border border-orange-500/15 text-[9px] uppercase">
                          Админ
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-white/30 text-orange-900/75 font-bold rounded-lg border border-white/20 text-[9px] uppercase">
                          Доп.
                        </span>
                      )}

                      <div className="w-6 text-right font-mono text-orange-900 flex items-center justify-end">
                        {isCurrentPlayingThis ? (
                          <Volume2 className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
                        ) : (
                          <Music className="w-3.5 h-3.5 text-orange-800/40" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-orange-900/50 text-xs sm:text-sm space-y-2 font-semibold" id="playlist-empty-state">
              <Disc className="w-6 h-6 text-orange-700/50 mx-auto animate-spin" style={{ animationDuration: "4s" }} />
              <p>Нет треков, соответствующих поиску</p>
            </div>
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/15 p-4 rounded-2xl border border-white/25 flex items-start space-x-2.5 backdrop-blur-md shadow-sm" 
          id="playlist-tip-banner"
        >
          <Sparkles className="w-4.5 h-4.5 text-orange-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-extrabold text-orange-950 text-xs sm:text-sm font-sans uppercase tracking-tight">
              Непрерывное фоновое воспроизведение
            </h5>
            <p className="text-xxs sm:text-xs text-orange-900/90 leading-relaxed font-semibold">
              Музыка продолжит играть, даже если вы перейдёте на главную страницу или будете просматривать контакты администрации. 
              Используйте плеер внизу страницы, чтобы управлять громкостью, перематывать аудио или переключаться на следующий трек.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
