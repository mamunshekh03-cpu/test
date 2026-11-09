import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User as UserIcon,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Shield,
  Sparkles,
  Zap
} from 'lucide-react';
import { AuthUser, AuthView, Language } from '../types/auth';
import { getT } from '../utils/translations';

interface LoginPageProps {
  onLoginSuccess: (user: AuthUser, message: string) => void;
  onBackToHome: () => void;
  language: Language;
  initialView?: AuthView;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onBackToHome,
  language,
  initialView = 'login',
}) => {
  const t = getT(language);
  const [view, setView] = useState<AuthView>(initialView);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resetSentNotice, setResetSentNotice] = useState<string | null>(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleQuickFill = (role: 'user' | 'admin') => {
    setErrors({});
    if (role === 'user') {
      setEmail('mamunshekh03@gmail.com');
      setPassword('UserPass2026!');
      setFullName('Mamun Shekh');
    } else {
      setEmail('admin@appstudio.dev');
      setPassword('AdminPass2026!');
      setFullName('System Admin');
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!email.trim() || !validateEmail(email)) {
      newErrors.email = t.errorInvalidEmail;
    }
    if (!password || password.length < 6) {
      newErrors.password = t.errorShortPassword;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const isAdmin = email.toLowerCase().includes('admin');
      const user: AuthUser = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        name: fullName.trim() || (email.split('@')[0].replace(/[._-]/g, ' ') || 'User'),
        email: email.trim(),
        role: isAdmin ? 'admin' : 'user',
        joinedAt: new Date().toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      };
      onLoginSuccess(user, t.loginSuccess);
    }, 600);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = t.errorNameRequired;
    }
    if (!email.trim() || !validateEmail(email)) {
      newErrors.email = t.errorInvalidEmail;
    }
    if (!password || password.length < 6) {
      newErrors.password = t.errorShortPassword;
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = t.errorPasswordMismatch;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: AuthUser = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        name: fullName.trim(),
        email: email.trim(),
        role: 'user',
        joinedAt: new Date().toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      };
      onLoginSuccess(user, t.registerSuccess);
    }, 700);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !validateEmail(email)) {
      setErrors({ email: t.errorInvalidEmail });
      return;
    }
    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResetSentNotice(t.resetEmailSent);
    }, 600);
  };

  const handleSocialLogin = (provider: 'Google' | 'GitHub') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: AuthUser = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        name: provider === 'Google' ? 'Mamun Shekh' : 'mamunshekh03',
        email: 'mamunshekh03@gmail.com',
        role: 'user',
        joinedAt: new Date().toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      };
      onLoginSuccess(user, `${provider} ${t.loginSuccess}`);
    }, 700);
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white">
      {/* Back button */}
      <div className="w-full max-w-md mb-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>{language === 'bn' ? 'প্রধান পাতায় ফিরে যান' : 'Back to Home'}</span>
        </button>
      </div>

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md">
        {/* Header & Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 shadow-lg shadow-indigo-500/20 mb-3">
            {view === 'forgot' ? (
              <KeyRound className="w-6 h-6 text-white" />
            ) : (
              <Sparkles className="w-6 h-6 text-white" />
            )}
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {view === 'login' && t.welcomeBack}
            {view === 'register' && t.createAccount}
            {view === 'forgot' && t.forgotPasswordTitle}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
            {view === 'login' && t.welcomeBackSub}
            {view === 'register' && t.createAccountSub}
            {view === 'forgot' && t.forgotPasswordSub}
          </p>
        </div>

        {/* View Switcher Tabs (Login / Register) */}
        {view !== 'forgot' && (
          <div className="grid grid-cols-2 p-1 bg-slate-950/80 rounded-xl mb-6 border border-slate-800/80">
            <button
              type="button"
              onClick={() => {
                setView('login');
                setErrors({});
                setResetSentNotice(null);
              }}
              className={`py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                view === 'login'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.signIn}
            </button>
            <button
              type="button"
              onClick={() => {
                setView('register');
                setErrors({});
                setResetSentNotice(null);
              }}
              className={`py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                view === 'register'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.signUp}
            </button>
          </div>
        )}

        {/* Quick Demo Fill Buttons (For immediate testing) */}
        {view === 'login' && (
          <div className="mb-6 p-3 bg-slate-950/60 border border-slate-800/90 rounded-xl">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 mb-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.quickFillTitle}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('user')}
                className="px-2.5 py-1.5 text-xs text-left bg-slate-800/80 hover:bg-slate-800 hover:text-indigo-300 text-slate-300 rounded-lg transition-colors border border-slate-700/60 truncate cursor-pointer"
                title="Fill mamunshekh03@gmail.com"
              >
                {t.fillUser}
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className="px-2.5 py-1.5 text-xs text-left bg-slate-800/80 hover:bg-slate-800 hover:text-indigo-300 text-slate-300 rounded-lg transition-colors border border-slate-700/60 truncate cursor-pointer"
                title="Fill admin@appstudio.dev"
              >
                {t.fillAdmin}
              </button>
            </div>
          </div>
        )}

        {/* Forgot password success notice */}
        {resetSentNotice && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{resetSentNotice}</span>
          </div>
        )}

        {/* FORMS */}
        {view === 'login' && (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {t.emailLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  placeholder={t.emailPlaceholder}
                  className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-950/70 border rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-rose-500/80 focus:ring-rose-500/20'
                      : 'border-slate-800 focus:border-indigo-500/80 focus:ring-indigo-500/20'
                  }`}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  {t.passwordLabel}
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setView('forgot');
                    setErrors({});
                    setResetSentNotice(null);
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  {t.forgotPasswordLink}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                  }}
                  placeholder={t.passwordPlaceholder}
                  className={`w-full pl-9 pr-10 py-2.5 bg-slate-950/70 border rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? 'border-rose-500/80 focus:ring-rose-500/20'
                      : 'border-slate-800 focus:border-indigo-500/80 focus:ring-indigo-500/20'
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-400 cursor-pointer">
                {t.rememberMe}
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{t.submitSignIn}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {view === 'register' && (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {t.fullNameLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                  }}
                  placeholder={t.fullNamePlaceholder}
                  className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-950/70 border rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName
                      ? 'border-rose-500/80 focus:ring-rose-500/20'
                      : 'border-slate-800 focus:border-indigo-500/80 focus:ring-indigo-500/20'
                  }`}
                  disabled={isLoading}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {t.emailLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  placeholder={t.emailPlaceholder}
                  className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-950/70 border rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-rose-500/80 focus:ring-rose-500/20'
                      : 'border-slate-800 focus:border-indigo-500/80 focus:ring-indigo-500/20'
                  }`}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {t.passwordLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                  }}
                  placeholder={t.passwordPlaceholder}
                  className={`w-full pl-9 pr-10 py-2.5 bg-slate-950/70 border rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? 'border-rose-500/80 focus:ring-rose-500/20'
                      : 'border-slate-800 focus:border-indigo-500/80 focus:ring-indigo-500/20'
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {t.confirmPasswordLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                  }}
                  placeholder={t.confirmPasswordPlaceholder}
                  className={`w-full pl-9 pr-10 py-2.5 bg-slate-950/70 border rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.confirmPassword
                      ? 'border-rose-500/80 focus:ring-rose-500/20'
                      : 'border-slate-800 focus:border-indigo-500/80 focus:ring-indigo-500/20'
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.confirmPassword}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{t.submitSignUp}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {view === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {t.emailLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  placeholder={t.emailPlaceholder}
                  className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-950/70 border rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-rose-500/80 focus:ring-rose-500/20'
                      : 'border-slate-800 focus:border-indigo-500/80 focus:ring-indigo-500/20'
                  }`}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>{t.submitReset}</span>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setView('login');
                  setErrors({});
                  setResetSentNotice(null);
                }}
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
              >
                {t.backToLogin}
              </button>
            </div>
          </form>
        )}

        {/* Social Logins */}
        {view !== 'forgot' && (
          <div className="mt-6 pt-6 border-t border-slate-800/80">
            <div className="relative flex justify-center text-xs uppercase mb-4">
              <span className="bg-slate-900 px-2 text-slate-500 tracking-wider font-medium">
                {t.orContinueWith}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-xs font-medium text-slate-200 transition-colors cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.4 7.5 23 12 23z"
                  />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('GitHub')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-xs font-medium text-slate-200 transition-colors cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </button>
            </div>
          </div>
        )}

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <Shield className="w-3.5 h-3.5 text-slate-400" />
          <span>{language === 'bn' ? 'নিরাপদ এবং এনক্রিপ্ট করা সেশন' : 'Protected by 256-bit SSL encryption'}</span>
        </div>
      </div>
    </div>
  );
};
