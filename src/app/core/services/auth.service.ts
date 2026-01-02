import { Injectable } from '@angular/core';

export interface AuthUser {
  username: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  login(username: string, password: string): boolean {
    // Mock simple: acepta cualquier usuario con password no vacía
    if (!username || !password) {
      return false;
    }

    const fakeToken = 'mock-token-' + username;
    const user: AuthUser = {
      username,
      email: `${username}@example.com`,
    };

    this.setSession(fakeToken, user);
    return true;
  }

  register(username: string, email: string, password: string): boolean {
    // Mock: simplemente guarda usuario y token igual que login
    if (!username || !email || !password) {
      return false;
    }

    const fakeToken = 'mock-token-' + username;
    const user: AuthUser = { username, email };

    this.setSession(fakeToken, user);
    return true;
  }

  setSession(token: string, user: AuthUser): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getCurrentUser(): AuthUser | null {
    const data = localStorage.getItem(this.USER_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data) as AuthUser;
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
