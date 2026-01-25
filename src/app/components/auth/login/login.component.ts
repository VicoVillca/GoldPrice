import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    PasswordModule
  ],
  providers: [MessageService]
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  onSubmit(): void {
    if (!this.usuario || !this.password) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor ingrese usuario y contraseña'
      });
      return;
    }

    this.loading = true;
    
    this.authService.login(this.usuario, this.password).subscribe({
      next: (success) => {
        if (success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Inicio de sesión exitoso'
          });
          
          // Redirigir después de un breve delay
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Credenciales incorrectas'
          });
          this.loading = false;
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error en el servidor. Intente más tarde.'
        });
        this.loading = false;
      }
    });
  }
  
}