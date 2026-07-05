import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AudioProvider } from "./context/AudioContext";
import { Header } from "./components/Header";
import { HomeSection } from "./components/HomeSection";
import { AdminSection } from "./components/AdminSection";
import { PlaylistSection } from "./components/PlaylistSection";
import { GlobalPlayerBar } from "./components/GlobalPlayerBar";
import { Sun, Heart, Send, Sparkles } from "lucide-react";

const MainLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"home" | "admin" | "playlist">("home");

  return (
    <div className="min-h-screen flex flex-col text-orange-950 pb-32 pt-4 px-2 sm:px-4" id="app-root-layout">
      {/* Dynamic Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Sections with Fluid Transitions */}
      <main className="flex-grow max-w-6xl w-full mx-auto pt-6" id="main-content-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            id="active-tab-container"
          >
            {activeTab === "home" && <HomeSection />}
            {activeTab === "admin" && <AdminSection />}
            {activeTab === "playlist" && <PlaylistSection />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Details in a beautiful frosted glass container */}
      <footer className="text-center py-8 px-6 bg-white/20 backdrop-blur-md border border-white/40 rounded-3xl mt-16 max-w-5xl mx-auto w-full text-xs text-orange-950/80 space-y-2 shadow-lg" id="app-footer-credits">
        <div className="flex items-center justify-center space-x-2 text-orange-900" id="footer-logo">
          <Sun className="w-4 h-4 text-orange-600 animate-spin-slow" style={{ animationDuration: "12s" }} />
          <span className="font-extrabold font-sans tracking-wide uppercase">Sunshine Bot Community</span>
        </div>
        <p className="font-medium">
          Официальный информационный сайт-лендинг Telegram-бота Sunshine.
        </p>
        <div className="flex items-center justify-center space-x-1.5 text-orange-900/60 mt-2 font-mono text-[10px]" id="footer-maker">
          <span>Made and Designed by @kotickr</span>
          <Heart className="w-3.5 h-3.5 text-orange-600 fill-current" />
        </div>
      </footer>

      {/* Persistent global audio player bar */}
      <GlobalPlayerBar />
    </div>
  );
};

export default function App() {
  return (
    <AudioProvider id="audio-provider-wrapper">
      <MainLayout />
    </AudioProvider>
  );
}
