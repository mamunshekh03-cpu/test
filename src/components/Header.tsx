import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, LogIn, LogOut, User, Globe, ChevronDown, Shield } from 'lucide-react';
import { AuthUser, AppView, Language } from '../types/auth';
import { getT } from '../utils/translations';

interface HeaderProps {
  currentUser: AuthUser | null;
  currentView: AppView;
  language: Language;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  currentView,
  language,
  onNavigate,
  onLogout,
  onLanguageChange,
}) => {
  const t = getT(language);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="relative z-20 border-b border-slate-800/80 px-6 py-3.5 flex items-center justify-between gap-8 backdrop-blur-md bg-slate-950/70">
      {/* Zone 1: Brand title, single line */}
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2.5 text-left cursor-pointer group shrink-0"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold tracking-tight text-slate-100 text-base whitespace-nowrap">
          {t.brand}
        </span>
      </button>

      {/* Zone 2: Clean single-line nav links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => onNavigate('home')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            currentView === 'home' ? 'text-indigo-400' : ''
          }`}
        >
          {t.navHome}
        </button>
        <a
          href="#features"
          onClick={(e) => {
            if (currentView !== 'home') {
              e.preventDefault();
              onNavigate('home');
            }
          }}
          className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0"
        >
          {t.navFeatures}
        </a>
        <a
          href="#docs"
          onClick={(e) => {
            if (currentView !== 'home') {
              e.preventDefault();
              onNavigate('home');
            }
          }}
          className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0"
        >
          {t.navDocs}
        </a>
      </nav>

      {/* Zone 3: Primary action + language toggle */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Language switch button */}
        <button
          onClick={() => onLanguageChange(language === 'bn' ? 'en' : 'bn')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-900/90 border border-slate-800 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          title={language === 'bn' ? 'Switch to English' : 'বাংলা ভাষায় পরিবর্তন করুন'}
        >
          <Globe className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-medium">{language === 'bn' ? 'EN' : 'বাং'}</span>
        </button>

        {currentUser ? (
          /* User Profile Dropdown */
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-200 transition-all cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-[11px] font-bold text-white shadow-sm">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-medium max-w-[120px] truncate">
                {currentUser.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 text-slate-200">
                <div className="px-3.5 py-2 border-b border-slate-800/80">
                  <p className="text-xs font-semibold text-white truncate">
                    {currentUser.name}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {currentUser.email}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    <Shield className="w-3 h-3" />
                    <span>{currentUser.role === 'admin' ? t.roleAdmin : t.roleUser}</span>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t.signOut}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Sign In Button */
          <button
            onClick={() => onNavigate('auth')}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-600/30 transition-all cursor-pointer whitespace-nowrap"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{t.signIn}</span>
          </button>
        )}
      </div>
    </header>
  );
};
