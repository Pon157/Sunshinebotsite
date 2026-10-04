import React from "react";
import { Sun, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  activeTab: "home";
  setActiveTab: (tab: "home") => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-4 z-40 bg-white/30 backdrop-blur-lg border border-white/40 rounded-[2rem] p-3 shadow-lg max-w-6xl mx-auto w-full" id="app-header">
      <div className="flex items-center justify-between gap-4" id="header-container">
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

        <a
          href="http://t.me/Sunshine_1_bot"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl text-xs font-black text-white uppercase tracking-widest shadow-md shadow-orange-500/20 flex items-center gap-1 transition-all duration-200"
          id="btn-header-bot"
        >
          <span>Наш бот</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  );
};
