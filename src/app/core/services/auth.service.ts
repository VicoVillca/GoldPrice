import { Injectable, signal, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = signal<boolean>(this.loadAuthState());
  currentUser = signal<User | null>(this.loadUserFromStorage());
  private router = inject(Router);

  // Google Client ID
  readonly googleClientId = environment.googleClientId;

  // Allowed Emails List
  readonly allowedEmails = environment.usuarios;

  constructor() {
    effect(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('isAuthenticated', JSON.stringify(this.isAuthenticated()));
        if (this.currentUser()) {
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser()));
        } else {
          localStorage.removeItem('currentUser');
        }
      }
    });
  }

  // Pure JS Google JWT decoder
  private decodeJwt(token: string): Record<string, string> | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window.atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload) as Record<string, string>;
    } catch (e) {
      console.error('Error decoding Google JWT', e);
      return null;
    }
  }

  loginWithGoogleCredential(credential: string): { success: boolean; error?: string } {
    const payload = this.decodeJwt(credential);
    if (!payload) {
      return { success: false, error: 'Token de Google inválido.' };
    }

    const email = payload['email']?.toLowerCase();
    if (!email) {
      return { success: false, error: 'No se pudo obtener el correo de la cuenta de Google.' };
    }

    if (!this.allowedEmails.includes(email)) {
      return { 
        success: false, 
        error: `El correo ${email} no tiene acceso. Debes solicitar permiso al correo vicovillca@gmail.com` 
      };
    }

    const user: User = {
      id: payload['sub'],
      username: payload['name'] || payload['email'].split('@')[0],
      email: payload['email'],
      photoUrl: payload['picture'],
      role: 'admin', // All allowed users are administrators
      givenName: payload['given_name'],
      familyName: payload['family_name']
    };

    this.currentUser.set(user);
    this.isAuthenticated.set(true);
    return { success: true };
  }

  logout() {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('currentUser');
    }
    this.router.navigate(['/login']);
  }

  private loadAuthState(): boolean {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('isAuthenticated');
      return stored ? JSON.parse(stored) : false;
    }
    return false;
  }

  private loadUserFromStorage(): User | null {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('currentUser');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  }
}
