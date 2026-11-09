export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatarUrl?: string;
  joinedAt: string;
}

export type AuthView = 'login' | 'register' | 'forgot';
export type AppView = 'home' | 'auth';
export type Language = 'bn' | 'en';
