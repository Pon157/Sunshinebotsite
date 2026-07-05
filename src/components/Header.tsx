import React from "react";
import { motion } from "motion/react";
import { Sun, Users, Music, Bot, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  activeTab: "home" | "admin" | "playlist";
  setActiveTab: (tab: "home" | "admin" | "playlist") => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: "home", label: "Главная", shortLabel: "Главная", icon: <Bot className="w-4 h-4" /> },
    { id: "admin", label: "Старшая администрация", shortLabel: "Админы", icon: <Users className="w-4 h-4" /> },
    { id: "playlist", label: "Плейлист", shortLabel: "Плейлист", icon: <Music className="w-4 h-4" /> },
  ] as const;

  return (
    <header className="sticky top-4 z-40 bg-white/30 backdrop-blur-lg border border-white/40 rounded-[2rem] p-3 shadow-lg max-w-6xl mx-auto w-full" id="app-header">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4" id="header-container">
        
        {/* App Logo */}
        <div 
          onClick={() => setActiveTab("home")}
          className="flex items-center space-x-3 cursor-pointer group"
          id="header-logo-block"
        >
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
            <Sun className="w-6 h-6 text-orange-700 animate-spin-slow" id="logo-spinning-sun" style={{ animationDuration: "25s" }} />
          </div>
          <span className="font-black text-orange-900 tracking-tight text-2xl font-sans uppercase">
            Sunshine
          </span>
        </div>

        {/* Tab Navigation Menu */}
        <nav className="flex items-center gap-1.5 sm:gap-2" id="header-navigation-tabs">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center space-x-1 sm:space-x-2 px-2.5 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? "bg-white/60 text-orange-950 shadow-sm" 
                    : "bg-white/20 text-orange-900 hover:bg-white/40"
                }`}
                id={`tab-button-${item.id}`}
              >
                <span className={isActive ? "text-orange-900" : "text-orange-800"}>
                  {item.icon}
                </span>
                <span>
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">{item.shortLabel}</span>
                </span>
              </button>
            );
          })}
        </nav>

        {/* Telegram Direct Link Button */}
        <a 
          href="http://t.me/Sunshine_1_bot" 
          target="_blank" 
          referrerPolicy="no-referrer"
          className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl text-xs font-black text-white uppercase tracking-widest shadow-md shadow-orange-500/20 flex items-center gap-1 transition-all hover:scale-105 active:scale-95"
          id="btn-header-bot"
        >
          <span>Наш бот</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  );
};
