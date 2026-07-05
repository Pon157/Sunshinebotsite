import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, 
  Play, 
  Pause, 
  Volume2, 
  X, 
  Image as ImageIcon, 
  Music as MusicIcon, 
  Sparkles,
  Info,
  Maximize2
} from "lucide-react";
import { ADMIN_PROFILES } from "../data/mockData";
import { AdminProfile, Track } from "../types";
import { useAudio } from "../context/AudioContext";

export const AdminSection: React.FC = () => {
  const [selectedAdmin, setSelectedAdmin] = useState<AdminProfile | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);
  const { currentTrack, isPlaying, playTrack } = useAudio();

  // Helper to trigger playing admin track
  const handlePlayAdminTrack = (track: Track, adminTracks: Track[]) => {
    playTrack(track, adminTracks);
  };

  return (
    <div className="space-y-10 py-2 md:py-4 px-2 sm:px-4" id="admin-section-wrapper">
      {/* Introduction text */}
      <div className="text-center max-w-2xl mx-auto space-y-3 px-2" id="admin-section-intro">
        <h2 className="text-2xl md:text-3.5xl font-black tracking-tight text-orange-950 font-sans uppercase">
          Старшая администрация
        </h2>
        <p className="text-orange-900/80 text-xs md:text-sm leading-relaxed font-semibold">
          Познакомься поближе с людьми, которые развивают бот Sunshine, обеспечивают его стабильность 
          и создают атмосферу уюта. Кликни на любого администратора, чтобы открыть галерею и послушать его плейлист.
        </p>
      </div>

      {/* Grid of Admin Profiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-2 sm:px-4" id="admin-profiles-grid">
        {ADMIN_PROFILES.map((admin) => (
          <motion.div
            key={admin.id}
            layoutId={`admin-card-container-${admin.id}`}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
            onClick={() => {
              setSelectedAdmin(admin);
              setActivePhotoIndex(0);
            }}
            className="bg-white/20 backdrop-blur-md rounded-3xl overflow-hidden border border-white/45 hover:border-white/60 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full group select-none"
            id={`admin-profile-card-${admin.id}`}
          >
            {/* Banner Photo */}
            <div className="relative h-44 sm:h-48 overflow-hidden bg-orange-100" id={`admin-banner-container-${admin.id}`}>
              <img
                src={admin.banner}
                alt={admin.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                id={`admin-banner-img-${admin.id}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              
              {/* Role Badge */}
              <div className="absolute bottom-3 left-4" id={`admin-role-badge-${admin.id}`}>
                <span className="px-2.5 py-1 bg-orange-500 text-white font-black text-[9px] tracking-wider uppercase rounded-lg shadow-sm">
                  {admin.role || "Администратор"}
                </span>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4" id={`admin-info-container-${admin.id}`}>
              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-black text-orange-950 font-sans group-hover:text-orange-900 transition-colors uppercase tracking-tight">
                  {admin.name}
                </h3>
                <p className="text-xs sm:text-sm text-orange-900/90 line-clamp-3 leading-relaxed font-semibold">
                  {admin.about}
                </p>
              </div>

              <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs text-orange-900 font-extrabold" id="admin-click-prompt">
                <span className="flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-orange-700" />
                  Подробнее о профиле
                </span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Admin Immersive Detail Modal */}
      <AnimatePresence>
        {selectedAdmin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4" id="admin-modal-overlay">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAdmin(null)}
              className="fixed inset-0 bg-stone-950/70 backdrop-blur-md"
              id="admin-modal-backdrop"
            />

            {/* Modal Body: Rounded overflow-hidden keeps scrollbars strictly enclosed */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white/95 backdrop-blur-xl rounded-[2rem] w-full max-w-4xl max-h-[90vh] shadow-2xl border border-white/50 relative z-10 flex flex-col overflow-hidden"
              id="admin-modal-content"
            >
              {/* Persistent close button outside scroll area, absolute to modal container */}
              <button
                onClick={() => setSelectedAdmin(null)}
                className="absolute top-4 right-4 p-2.5 bg-black/45 hover:bg-black/60 rounded-full text-white backdrop-blur-sm transition-all active:scale-90 z-30 shadow-md cursor-pointer"
                id="modal-close-button"
                title="Закрыть"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              {/* Inner Scrollable Wrapper - clipping with rounded-b keeps corners smooth */}
              <div 
                className="overflow-y-auto flex-1 flex flex-col rounded-[2rem]" 
                id="admin-modal-scrollable"
              >
                {/* Header Banner: click to open in lightbox */}
                <div 
                  className="relative h-44 sm:h-60 bg-stone-900 shrink-0 cursor-zoom-in group/banner select-none" 
                  id="modal-banner-section"
                  onClick={() => setLightboxPhoto(selectedAdmin.banner)}
                >
                  <img
                    src={selectedAdmin.banner}
                    alt={selectedAdmin.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-85 group-hover/banner:opacity-95 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-transparent to-black/30" />
                  
                  {/* Zoom indicator */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 bg-black/40 backdrop-blur-md text-white rounded-lg text-[9px] font-black uppercase opacity-0 group-hover/banner:opacity-100 transition-opacity">
                    <Maximize2 className="w-3 h-3" />
                    На весь экран
                  </div>

                  {/* Profile Title on Banner */}
                  <div className="absolute bottom-4 sm:bottom-6 left-5 sm:left-8" id="modal-title-block">
                    <span className="px-2.5 py-0.5 bg-orange-500 text-white font-black text-[9px] tracking-wider uppercase rounded-md shadow-sm">
                      {selectedAdmin.role || "Администратор"}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-orange-950 font-sans mt-1 sm:mt-2 uppercase tracking-tight">
                      {selectedAdmin.name}
                    </h2>
                  </div>
                </div>

                {/* Modal Core Grid */}
                <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 flex-1" id="modal-body-grid">
                  
                  {/* Left Column: About & Extra Photos */}
                  <div className="space-y-5 sm:space-y-6" id="modal-left-column">
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-black text-orange-900/60 uppercase tracking-wider font-mono">
                        О себе
                      </h4>
                      <p className="text-orange-950 text-xs sm:text-sm leading-relaxed bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/45 italic font-semibold">
                        "{selectedAdmin.about}"
                      </p>
                    </div>

                    {/* Additional Gallery */}
                    {selectedAdmin.additionalPhotos && selectedAdmin.additionalPhotos.length > 0 && (
                      <div className="space-y-3" id="modal-gallery-block">
                        <h4 className="text-[10px] font-black text-orange-900/60 uppercase tracking-wider font-mono flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5" />
                          Галерея ({selectedAdmin.additionalPhotos.length})
                        </h4>
                        
                        {/* Active Large Photo with click-to-lightbox */}
                        <div 
                          className="h-44 sm:h-56 bg-orange-50/50 rounded-2xl overflow-hidden border border-white/45 shadow-inner cursor-zoom-in group/gallery relative select-none" 
                          id="gallery-active-photo-container"
                          onClick={() => setLightboxPhoto(selectedAdmin.additionalPhotos[activePhotoIndex])}
                        >
                          <img
                            src={selectedAdmin.additionalPhotos[activePhotoIndex]}
                            alt={`${selectedAdmin.name} gallery`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover/gallery:scale-103 transition-transform duration-500"
                            id="gallery-active-photo"
                          />
                          
                          {/* Photo Hint */}
                          <div className="absolute inset-0 bg-black/0 group-hover/gallery:bg-black/20 flex items-center justify-center transition-all duration-300">
                            <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover/gallery:opacity-100 transition-opacity transform scale-90 group-hover/gallery:scale-100" />
                          </div>
                        </div>

                        {/* Photo Thumbnails */}
                        <div className="flex gap-2 overflow-x-auto py-1 scrollbar-thin" id="gallery-thumbnails">
                          {selectedAdmin.additionalPhotos.map((photo, index) => (
                            <button
                              key={index}
                              onClick={() => setActivePhotoIndex(index)}
                              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                                activePhotoIndex === index ? "border-orange-500 scale-95 shadow-sm" : "border-transparent opacity-65 hover:opacity-100"
                              }`}
                              id={`gallery-thumb-${index}`}
                            >
                              <img src={photo} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover select-none pointer-events-none" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Customized Music Player Playlist */}
                  <div className="space-y-5 sm:space-y-6" id="modal-right-column">
                    <div className="space-y-1 sm:space-y-2">
                      <h4 className="text-[10px] font-black text-orange-900/60 uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <MusicIcon className="w-3.5 h-3.5" />
                        Любимая музыка ({selectedAdmin.music.length})
                      </h4>
                      <p className="text-[11px] sm:text-xs text-orange-900/80 font-bold leading-normal">
                        Личные треки администратора. Нажми, чтобы начать воспроизведение.
                      </p>
                    </div>

                    <div className="space-y-2" id="modal-tracks-list">
                      {selectedAdmin.music.map((track) => {
                        const isCurrentPlayingThis = currentTrack?.id === track.id;
                        return (
                          <div
                            key={track.id}
                            onClick={() => handlePlayAdminTrack(track, selectedAdmin.music)}
                            className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all duration-200 select-none active:scale-[0.99] ${
                              isCurrentPlayingThis 
                                ? "bg-orange-500 text-white border-orange-500 shadow-md" 
                                : "bg-white/40 text-orange-950 border-white/45 hover:bg-white/60"
                            }`}
                            id={`modal-track-${track.id}`}
                          >
                            <div className="flex items-center space-x-3 min-w-0 flex-1">
                              {/* Play Indicator / Cover */}
                              <div className="relative w-9 h-9 rounded-xl overflow-hidden shrink-0 bg-stone-100 shadow-sm border border-white/20">
                                <img src={track.coverUrl} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover select-none pointer-events-none" />
                                <div className={`absolute inset-0 flex items-center justify-center bg-black/20 ${isCurrentPlayingThis ? "opacity-100" : "opacity-0 hover:opacity-100"} transition-opacity`}>
                                  {isCurrentPlayingThis && isPlaying ? (
                                    <Pause className="w-3.5 h-3.5 text-white fill-current" />
                                  ) : (
                                    <Play className="w-3.5 h-3.5 text-white fill-current" />
                                  )}
                                </div>
                              </div>

                              {/* Track Info */}
                              <div className="text-left min-w-0 flex-1">
                                <h5 className={`text-xs sm:text-sm font-extrabold truncate ${isCurrentPlayingThis ? "text-white" : "text-orange-950"}`}>
                                  {track.title}
                                </h5>
                                <p className={`text-[10px] sm:text-xs truncate mt-0.5 ${isCurrentPlayingThis ? "text-orange-100" : "text-orange-900/75 font-semibold"}`}>
                                  {track.artist}
                                </p>
                              </div>
                            </div>

                            {/* Sound wave visualizer or play icon */}
                            <div className="flex items-center space-x-2 shrink-0 pl-1">
                              {isCurrentPlayingThis && isPlaying ? (
                                <div className="flex items-end gap-0.5 h-3.5 w-3.5" id="soundwave-modal-indicator">
                                  <span className="w-0.5 bg-current rounded-sm animate-bar-1 origin-bottom" />
                                  <span className="w-0.5 bg-current rounded-sm animate-bar-2 origin-bottom" style={{ animationDelay: "0.1s" }} />
                                  <span className="w-0.5 bg-current rounded-sm animate-bar-3 origin-bottom" style={{ animationDelay: "0.2s" }} />
                                </div>
                              ) : (
                                <Volume2 className={`w-3.5 h-3.5 ${isCurrentPlayingThis ? "text-white" : "text-orange-800"}`} />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-white/30 p-3 sm:p-4 rounded-2xl border border-white/40 flex items-start gap-2.5 mt-2">
                      <Sparkles className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <div className="text-[11px] sm:text-xs text-orange-950 font-bold leading-normal">
                        Вы можете слушать эти и другие треки вместе во вкладке <span className="font-extrabold text-orange-900">Плейлист</span>. Вся музыка играет непрерывно в фоновом режиме.
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Photo Lightbox: Full-Screen View */}
      <AnimatePresence>
        {lightboxPhoto && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 bg-black/90 backdrop-blur-md" id="photo-lightbox-overlay">
            {/* Click backdrop to exit */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxPhoto(null)}
              className="absolute inset-0 cursor-zoom-out"
            />
            
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-all active:scale-90 z-[110] cursor-pointer"
              id="lightbox-close"
              title="Закрыть во весь экран"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            {/* Lightbox Content */}
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative max-w-full max-h-[85vh] z-10 flex flex-col items-center gap-3 sm:gap-4 pointer-events-none"
              id="lightbox-content"
            >
              <img
                src={lightboxPhoto}
                alt="Full screen view"
                referrerPolicy="no-referrer"
                className="max-w-[95vw] max-h-[75vh] sm:max-h-[80vh] object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-white/10 select-none pointer-events-auto cursor-zoom-out"
                onClick={() => setLightboxPhoto(null)}
              />
              <p className="text-white/70 text-[10px] sm:text-xs font-semibold select-none bg-black/40 px-3.5 py-1.5 rounded-full backdrop-blur-sm pointer-events-auto">
                Кликните на изображение или фон, чтобы закрыть
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
