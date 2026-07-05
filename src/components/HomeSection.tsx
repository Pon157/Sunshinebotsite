import React from "react";
import { motion } from "motion/react";
import { 
  Sun, 
  Bot, 
  UserCheck, 
  ShieldAlert, 
  Users, 
  MessageSquare, 
  Video, 
  MessageCircle, 
  Clock, 
  Sparkles, 
  Send, 
  BookOpen,
  ArrowUpRight,
  ExternalLink,
  Lock
} from "lucide-react";
import { NAV_LINKS } from "../data/mockData";

// Helper to match link types to Lucide Icons
const getIconForType = (type: string) => {
  switch (type) {
    case "admin":
      return <Users className="w-5 h-5 text-amber-600" id="icon-admin" />;
    case "rules":
      return <ShieldAlert className="w-5 h-5 text-red-600" id="icon-rules" />;
    case "reviews":
      return <MessageSquare className="w-5 h-5 text-orange-600" id="icon-reviews" />;
    case "tiktok":
      return <Video className="w-5 h-5 text-pink-600" id="icon-tiktok" />;
    case "chat":
      return <MessageCircle className="w-5 h-5 text-yellow-600" id="icon-chat" />;
    case "rests":
      return <Clock className="w-5 h-5 text-stone-600" id="icon-rests" />;
    case "promo":
      return <Sparkles className="w-5 h-5 text-yellow-600" id="icon-promo" />;
    case "bot":
      return <Bot className="w-5 h-5 text-amber-600" id="icon-bot" />;
    case "owner":
      return <Send className="w-5 h-5 text-orange-600" id="icon-owner" />;
    case "manual":
      return <BookOpen className="w-5 h-5 text-amber-700" id="icon-manual" />;
    default:
      return <Sparkles className="w-5 h-5 text-amber-500" id="icon-default" />;
  }
};

export const HomeSection: React.FC = () => {
  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="space-y-16 py-4" id="home-section-container">
      {/* Hero Header */}
      <div className="relative text-center max-w-3xl mx-auto px-4" id="hero-header-block">
        {/* Animated Sun Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-400 rounded-full blur-3xl opacity-35 -z-10 animate-pulse-slow" />
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center p-4 bg-white/30 backdrop-blur-md rounded-full mb-6 border border-white/40 shadow-md"
          id="sunshine-logo-wrapper"
        >
          <Sun className="w-12 h-12 text-orange-700 animate-spin-slow" id="sun-logo-icon" style={{ animationDuration: "25s" }} />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-orange-950 font-sans uppercase"
          id="hero-title"
        >
          Sunshine <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Bot</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-6 text-base sm:text-lg text-orange-950/90 leading-relaxed max-w-xl mx-auto font-medium"
          id="hero-subtitle"
        >
          Твой идеальный проводник в мир лампового общения и поддержки. 
          Самое тёплое сообщество, интерактивные функции и заботливая администрация.
        </motion.p>
      </div>

      {/* Core Triggers Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4" id="core-triggers-container">
        
        {/* Trigger 1: Стать пользователем */}
        <motion.div 
          whileHover={{ y: -5, scale: 1.01 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl text-orange-950 shadow-xl relative overflow-hidden flex flex-col justify-between group border border-white/40"
          id="trigger-user-card"
        >
          <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500 text-orange-700">
            <Bot className="w-40 h-40" />
          </div>
          <div>
            <div className="w-12 h-12 bg-white/45 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/30">
              <Bot className="w-6 h-6 text-orange-700" />
            </div>
            <h3 className="text-2xl font-black font-sans text-orange-950 uppercase tracking-tight">Стать пользователем</h3>
            <p className="text-orange-900 text-sm mt-3 leading-relaxed font-medium">
              Запусти бота Sunshine за секунду. Получи доступ к увлекательному чату, играм, полезным функциям и поддержке.
            </p>
          </div>
          <div className="mt-8">
            <a 
              href="https://t.me/Sunshine_1_bot" 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="inline-flex w-full items-center justify-center px-4 py-3 bg-orange-600 text-white font-black uppercase tracking-wider rounded-2xl text-sm transition-all duration-300 hover:bg-orange-700 active:scale-95 shadow-lg shadow-orange-600/20"
              id="btn-become-user"
            >
              Запустить бота
              <ArrowUpRight className="w-4 h-4 ml-1.5" />
            </a>
          </div>
        </motion.div>

        {/* Trigger 2: Стать админом */}
        <motion.div 
          whileHover={{ y: -5, scale: 1.01 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl text-orange-950 shadow-xl relative overflow-hidden flex flex-col justify-between group border border-white/40"
          id="trigger-admin-card"
        >
          <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500 text-orange-700">
            <UserCheck className="w-40 h-40" />
          </div>
          <div>
            <div className="w-12 h-12 bg-white/45 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/30">
              <UserCheck className="w-6 h-6 text-orange-700" />
            </div>
            <h3 className="text-2xl font-black font-sans text-orange-950 uppercase tracking-tight">Стать админом</h3>
            <p className="text-orange-900 text-sm mt-3 leading-relaxed font-medium">
              Хочешь помогать проекту, следить за чатом и стать частью дружного коллектива? Подай заявку в нашу команду!
            </p>
          </div>
          <div className="mt-8">
            <a 
              href="https://t.me/Sunshine_1_bot" 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="inline-flex w-full items-center justify-center px-4 py-3 bg-amber-600 text-white font-black uppercase tracking-wider rounded-2xl text-sm transition-all duration-300 hover:bg-amber-700 active:scale-95 shadow-lg shadow-amber-600/20"
              id="btn-become-admin"
            >
              Подать заявку
              <ArrowUpRight className="w-4 h-4 ml-1.5" />
            </a>
          </div>
        </motion.div>

        {/* Trigger 3: Официальный Telegram Канал */}
        <motion.div 
          whileHover={{ y: -5, scale: 1.01 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl text-orange-950 shadow-2xl relative overflow-hidden flex flex-col justify-between group border border-white/40"
          id="trigger-channel-card"
        >
          <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500 text-orange-700">
            <Send className="w-40 h-40" />
          </div>
          <div>
            <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-4 border border-orange-400 shadow-md">
              <Send className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black font-sans text-orange-950 uppercase tracking-tight">Наш Telegram Канал</h3>
            <p className="text-orange-900/90 text-sm mt-3 leading-relaxed font-semibold">
              Будь в курсе новостей, конкурсов и обновлений бота Sunshine. Все важные анонсы и уютный лайфстайл проекта в одном месте.
            </p>
          </div>
          
          <div className="mt-8 space-y-3">
            <a 
              href="https://t.me/sunshinebott" 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="inline-flex w-full items-center justify-center px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-wider rounded-2xl text-sm transition-all duration-300 active:scale-95 shadow-lg shadow-orange-500/20"
              id="btn-subscribe-channel"
            >
              Подписаться на канал
              <ArrowUpRight className="w-4 h-4 ml-1.5" />
            </a>
            
            <a 
              href="https://t.me/+6jm7JADhBsZmN2Qy" 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="inline-flex w-full items-center justify-center px-4 py-2.5 bg-white/40 hover:bg-white/60 text-orange-950 font-black uppercase rounded-2xl text-xs transition-all duration-300 border border-white/40"
              id="btn-reviews-channel"
            >
              Смотреть отзывы
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </motion.div>

      </div>

      {/* Auxiliary Navigation Bento Grid */}
      <div className="max-w-6xl mx-auto px-4 space-y-6" id="nav-links-grid-wrapper">
        <div className="text-center md:text-left" id="links-grid-header">
          <h2 className="text-3xl font-black tracking-tight text-orange-950 font-sans uppercase">
            Дополнительные ресурсы
          </h2>
          <p className="text-sm text-orange-900/80 mt-1 font-semibold">
            Быстрый переход к полезным ресурсам, руководствам, отзывам и чату сообщества
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          id="links-bento-grid"
        >
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              href={link.url}
              target="_blank"
              referrerPolicy="no-referrer"
              className="group p-5 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-3xl border border-white/35 hover:border-white/55 shadow-md transition-all duration-300 flex items-start space-x-4"
              id={`nav-card-${link.id}`}
            >
              <div className="p-3 bg-white/40 rounded-2xl border border-white/30 group-hover:bg-white/60 transition-colors shrink-0">
                {getIconForType(link.type)}
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-orange-950 group-hover:text-orange-900 transition-colors text-sm font-sans">
                    {link.title}
                  </h4>
                  <ArrowUpRight className="w-4 h-4 text-orange-800/60 group-hover:text-orange-900 transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="text-xs text-orange-900/80 line-clamp-2 leading-relaxed font-medium">
                  {link.description}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
