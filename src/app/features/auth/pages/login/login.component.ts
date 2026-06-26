import { ChangeDetectionStrategy, Component, inject, signal, ElementRef, viewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { animate } from 'motion';
import { ButtonModule } from 'primeng/button';

interface GoogleIdInitializeOptions {
  client_id: string;
  callback: (response: { credential: string }) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
}

interface GoogleIdRenderButtonOptions {
  theme?: string;
  size?: string;
  width?: number;
  text?: string;
  shape?: string;
  logo_alignment?: string;
}

interface GoogleAccounts {
  id: {
    initialize: (options: GoogleIdInitializeOptions) => void;
    renderButton: (element: HTMLElement | null, options: GoogleIdRenderButtonOptions) => void;
    prompt: () => void;
  };
}

declare const google: {
  accounts: GoogleAccounts;
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, CommonModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  auth = inject(AuthService);
  router = inject(Router);
  
  error = signal<string | null>(null);
  isLoading = signal(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private checkInterval: any = null;
  
  loginCard = viewChild<ElementRef>('loginCard');

  ngAfterViewInit() {
    // Animación de entrada
    const el = this.loginCard()?.nativeElement;
    if (el) {
      animate(el, { opacity: [0, 1], y: [50, 0], scale: [0.9, 1] }, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
    }

    // Inicializar Google Sign-In
    this.initGoogleSignIn();
  }

  ngOnDestroy() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }

  private initGoogleSignIn() {
    let retries = 0;
    this.checkInterval = setInterval(() => {
      retries++;
      if (typeof google !== 'undefined' && google.accounts) {
        clearInterval(this.checkInterval);
        
        try {
          google.accounts.id.initialize({
            client_id: this.auth.googleClientId,
            callback: (response: { credential: string }) => this.handleCredentialResponse(response),
            auto_select: false,
            cancel_on_tap_outside: true
          });
          
          const container = document.getElementById('google-btn');
          const containerWidth = container ? container.clientWidth : 280;
          // Ensure width is within Google's supported range of [200, 400]
          const buttonWidth = Math.max(200, Math.min(400, containerWidth));

          google.accounts.id.renderButton(
            container,
            { 
              theme: 'outline', 
              size: 'large', 
              width: buttonWidth, 
              text: 'signin_with',
              shape: 'pill',
              logo_alignment: 'left'
            }
          );
          
          // Opcionalmente mostrar el prompt de One Tap
          google.accounts.id.prompt();
        } catch (err) {
          console.error('Error al inicializar Google Identity Services:', err);
        }
      } else if (retries > 50) {
        // Detener después de 5 segundos si no se puede cargar
        clearInterval(this.checkInterval);
        this.error.set('No se pudo cargar el servicio de inicio de sesión con Google. Revisa tu conexión a internet.');
      }
    }, 100);
  }

  private handleCredentialResponse(response: { credential: string }) {
    if (!response || !response.credential) {
      this.error.set('No se recibió la credencial de Google.');
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    // Pequeño retardo visual para simular verificación segura
    setTimeout(() => {
      const result = this.auth.loginWithGoogleCredential(response.credential);
      this.isLoading.set(false);
      
      if (result.success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error.set(result.error || 'Acceso denegado.');
      }
    }, 600);
  }
}
