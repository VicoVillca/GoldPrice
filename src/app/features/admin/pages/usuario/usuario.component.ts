import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, MatIconModule, CardModule],
  template: `
    <div class="profile-container py-4 px-3 md:px-6">


      <!-- Main Profile Content Grid -->
      <div class="grid justify-content-center">
        <div class="col-12 lg:col-8 p-2">
          @if (currentUser(); as user) {
            <div class="profile-card border-round-3xl shadow-2 p-4 md:p-5 flex flex-column md:flex-row align-items-center gap-5 relative overflow-hidden">
              <!-- Background accent line -->
              <div class="accent-bar"></div>

              <!-- Profile Picture with Elegant Ring -->
              <div class="profile-avatar-container relative">
                @if (user.photoUrl) {
                  <img [src]="user.photoUrl" referrerpolicy="no-referrer" alt="Google Avatar" class="avatar-img shadow-3 border-circle" />
                } @else {
                  <div class="avatar-placeholder flex align-items-center justify-content-center border-circle shadow-3">
                    <mat-icon style="font-size: 4rem; width: 4rem; height: 4rem;">person</mat-icon>
                  </div>
                }
                <div class="provider-badge flex align-items-center justify-content-center border-circle shadow-2">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
              </div>

              <!-- User Main Details -->
              <div class="flex-1 text-center md:text-left">
                <div class="flex flex-column md:flex-row align-items-center md:align-items-start justify-content-between gap-3 mb-3">
                  <div>
                    <h2 class="text-2xl font-bold m-0">{{ user.username }}</h2>
                    <p class="text-sm m-0 mt-1" style="color: var(--text-muted)">{{ user.email }}</p>
                  </div>
                  <span class="role-badge flex align-items-center gap-1 font-semibold text-xs py-1 px-3 border-round-full uppercase tracking-wider">
                    <mat-icon style="font-size: 1rem; width: 1rem; height: 1rem;">verified</mat-icon>
                    {{ user.role === 'admin' ? 'Administrador' : 'Usuario' }}
                  </span>
                </div>

                <!-- Session details and action -->
                <div class="flex flex-column sm:flex-row justify-content-between align-items-center gap-4 mt-5 pt-4 border-top-1 border-white-alpha-10">

                  <button 
                    (click)="logout()" 
                    class="logout-action-btn flex align-items-center justify-content-center gap-2 py-3 px-4 border-round-xl font-bold cursor-pointer transition-all"
                  >
                    <mat-icon>power_settings_new</mat-icon>
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          } @else {
            <div class="p-4 text-center">
              <p>No se encontró información del usuario autenticado.</p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      font-family: var(--font-sans);
    }

    .header-banner {
      background-color: var(--bg-card) !important;
      color: var(--text-main) !important;
      border: 1px solid var(--border);
      box-shadow: var(--box-shadow);
      h1 {
        color: var(--text-main) !important;
      }
      p {
        color: var(--text-muted) !important;
      }
    }

    .profile-card {
      background-color: var(--bg-card) !important;
      border: 1px solid var(--border) !important;
      box-shadow: var(--box-shadow);
      border-radius: 24px;
      
      .accent-bar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 5px;
        background: linear-gradient(90deg, var(--primary), #818cf8);
      }

      h2 {
        color: var(--text-main) !important;
      }
    }

    .profile-avatar-container {
      width: 140px;
      height: 140px;
      flex-shrink: 0;

      .avatar-img {
        width: 140px;
        height: 140px;
        object-fit: cover;
        border: 4px solid var(--bg-main);
        background-color: var(--bg-main);
      }

      .avatar-placeholder {
        width: 140px;
        height: 140px;
        background-color: var(--bg-main);
        color: var(--text-muted);
        border: 4px solid var(--bg-main);
      }

      .provider-badge {
        position: absolute;
        bottom: 4px;
        right: 4px;
        width: 32px;
        height: 32px;
        background-color: white;
        border: 1px solid #e2e8f0;
      }
    }

    .role-badge {
      background-color: rgba(245, 158, 11, 0.1) !important;
      color: #d97706 !important;
      border: 1px solid rgba(245, 158, 11, 0.2);
    }

    .info-details-grid {
      border-color: var(--border) !important;
      
      .detail-label {
        color: var(--text-muted) !important;
        letter-spacing: 0.05em;
      }

      .detail-value {
        color: var(--text-main) !important;
      }
    }

    .border-top-1 {
      border-top: 1px solid var(--border) !important;
    }

    .logout-action-btn {
      background-color: #ef4444 !important;
      color: white !important;
      border: none !important;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
      
      &:hover {
        background-color: #dc2626 !important;
        box-shadow: 0 6px 16px rgba(239, 68, 68, 0.3);
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuarioComponent {
  authService = inject(AuthService);
  currentUser = this.authService.currentUser;

  logout() {
    this.authService.logout();
  }
}
