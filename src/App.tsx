import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Code2,
  Rocket,
  Palette,
  ArrowRight,
  CheckCircle2,
  Shield,
  Layers,
  Terminal,
  LogIn,
  LogOut,
  FolderKanban,
  FileCode,
  Laptop
} from 'lucide-react';
import { AuthUser, AppView, Language, AuthView } from './types/auth';
import { getT } from './utils/translations';
import { Header } from './components/Header';
import { LoginPage } from './components/LoginPage';

export default function App() {
  const [language, setLanguage] = useState<Language>('bn');
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [authInitialView, setAuthInitialView] = useState<AuthView>('login');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const t = getT(language);

  // Initialize user from localStorage if present
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('app_studio_auth_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
      const savedLang = localStorage.getItem('app_studio_lang');
      if (savedLang === 'en' || savedLang === 'bn') {
        setLanguage(savedLang);
      }
    } catch {
      // Local storage unavailable
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('app_studio_lang', lang);
    } catch {
      // Ignore
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleLoginSuccess = (user: AuthUser, message: string) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('app_studio_auth_user', JSON.stringify(user));
    } catch {
      // Ignore
    }
    setCurrentView('home');
    showToast(message);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('app_studio_auth_user');
    } catch {
      // Ignore
    }
    showToast(t.logoutSuccess);
  };

  const openAuth = (mode: AuthView = 'login') => {
    setAuthInitialView(mode);
    setCurrentView('auth');
  };

  const suggestions = [
    {
      icon: Sparkles,
      title: language === 'bn' ? 'এআই প্রোডাক্টিভিটি স্যুট' : 'AI Productivity Suite',
      desc: language === 'bn' ? 'ডকুমেন্ট ইন্টেলিজেন্স, স্মার্ট নোট ও প্রাসঙ্গিক সহকারী।' : 'Document intelligence, smart note-taking, or contextual assistants.',
      tag: language === 'bn' ? 'এআই ও টুলস' : 'AI & Tools'
    },
    {
      icon: Palette,
      title: language === 'bn' ? 'ইন্টারেক্টিভ ড্যাশবোর্ড' : 'Interactive Dashboard',
      desc: language === 'bn' ? 'রিয়েল-টাইম অ্যানালিটিক্স, আর্থিক ট্র্যাকার ও চার্ট ভিউ।' : 'Real-time analytics, financial trackers, or rich data visualizations.',
      tag: language === 'bn' ? 'অ্যানালিটিক্স' : 'Analytics'
    },
    {
      icon: Rocket,
      title: language === 'bn' ? 'স্যাস বা ই-কমার্স হাব' : 'SaaS or Commerce Hub',
      desc: language === 'bn' ? 'ফিচার-সমৃদ্ধ ওয়েব অ্যাপ, ওয়ার্কফ্লো এবং গ্রাহক পোর্টাল।' : 'Feature-rich web app with workflows, catalogs, and customer portals.',
      tag: language === 'bn' ? 'ফুল অ্যাপ্লিকেশন' : 'Full Application'
    },
    {
      icon: Code2,
      title: language === 'bn' ? 'ক্রিয়েটিভ প্লেগ্রাউন্ড' : 'Creative Playground',
      desc: language === 'bn' ? 'ক্যানভাস স্টুডিও, অডিও ভিজ্যুয়ালাইজার বা গেমের অভিজ্ঞতা।' : 'Canvas studio, interactive audio-visualizer, or game experience.',
      tag: language === 'bn' ? 'ইন্টারেক্টিভ' : 'Interactive'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden font-sans">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-indigo-600/20 via-sky-500/15 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] bg-indigo-900/10 blur-3xl pointer-events-none rounded-full" />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900/95 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        currentUser={currentUser}
        currentView={currentView}
        language={language}
        onNavigate={setCurrentView}
        onLogout={handleLogout}
        onLanguageChange={handleLanguageChange}
      />

      {/* Main Content Area */}
      {currentView === 'auth' ? (
        <main className="relative z-10 flex-1 flex flex-col justify-center">
          <LoginPage
            initialView={authInitialView}
            language={language}
            onLoginSuccess={handleLoginSuccess}
            onBackToHome={() => setCurrentView('home')}
          />
        </main>
      ) : (
        <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 text-center my-auto w-full">
          {/* User Welcome Card if Logged In */}
          {currentUser ? (
            <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-left backdrop-blur-sm shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-lg font-bold text-white shadow-md shadow-indigo-600/20 shrink-0">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base sm:text-lg font-semibold text-white">
                        {language === 'bn' ? `স্বাগতম, ${currentUser.name}!` : `Welcome back, ${currentUser.name}!`}
                      </h2>
                      <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {currentUser.role === 'admin' ? t.roleAdmin : t.roleUser}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {currentUser.email} · {language === 'bn' ? `যোগদানের তারিখ: ${currentUser.joinedAt}` : `Member since: ${currentUser.joinedAt}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-400" />
                    <span>{t.signOut}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.heroTag}</span>
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            {t.heroTitlePrefix}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-400">
              {t.heroTitleHighlight}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Quick CTA banner if logged out */}
          {!currentUser && (
            <div className="mb-12 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => openAuth('login')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>{language === 'bn' ? 'লগইন পেজে যান' : 'Go to Login Page'}</span>
              </button>
              <button
                onClick={() => openAuth('register')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white font-medium text-sm rounded-xl transition-all cursor-pointer"
              >
                <span>{language === 'bn' ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Create Free Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Suggestion Grid */}
          <div id="features" className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {suggestions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-slate-800/80 text-indigo-400 group-hover:text-indigo-300 group-hover:bg-indigo-500/10 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider bg-slate-800/40 px-2.5 py-0.5 rounded">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-100 group-hover:text-white text-base mb-1 flex items-center justify-between">
                    {item.title}
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                  </h3>
                  <p className="text-sm text-slate-400 leading-snug">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Quick Info Strip */}
          <div id="docs" className="mt-12 pt-8 border-t border-slate-900 text-left grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="flex items-center gap-2 text-slate-200 font-medium mb-1">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span>{language === 'bn' ? 'নিরাপদ অথেনটিকেশন' : 'Secure Authentication'}</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {language === 'bn' ? 'পাসওয়ার্ড ভ্যালিডেশন, শো/হাইড টগল এবং সেশন স্টোরেজ সাপোর্ট।' : 'Password validation, show/hide toggle, and session persistence.'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="flex items-center gap-2 text-slate-200 font-medium mb-1">
                <Layers className="w-4 h-4 text-sky-400" />
                <span>{language === 'bn' ? 'এক-ক্লিক ডেমো অ্যাকাউন্ট' : '1-Click Demo Accounts'}</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {language === 'bn' ? 'ব্যবহারকারী এবং অ্যাডমিন ক্রেডেনশিয়াল দিয়ে সরাসরি টেস্ট করুন।' : 'Test immediately with pre-filled User and Admin credentials.'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="flex items-center gap-2 text-slate-200 font-medium mb-1">
                <Laptop className="w-4 h-4 text-cyan-400" />
                <span>{language === 'bn' ? 'দ্বিভাষিক সমর্থন' : 'Bilingual Support'}</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {language === 'bn' ? 'বাংলা ও ইংরেজি উভয় ভাষাতেই সহজ ও পরিষ্কার ইন্টারফেস।' : 'Seamless switching between Bengali and English interfaces.'}
              </p>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/60 py-4 px-6 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between max-w-5xl mx-auto w-full gap-2">
        <span>{t.footerText}</span>
        <div className="flex items-center gap-4 text-slate-500">
          <button
            onClick={() => handleLanguageChange(language === 'bn' ? 'en' : 'bn')}
            className="hover:text-slate-300 transition-colors cursor-pointer"
          >
            {language === 'bn' ? 'English এ দেখুন' : 'বাংলায় দেখুন'}
          </button>
          <span>·</span>
          <button
            onClick={() => openAuth('login')}
            className="hover:text-slate-300 transition-colors cursor-pointer"
          >
            {currentUser ? t.myAccount : t.signIn}
          </button>
        </div>
      </footer>
    </div>
  );
}
