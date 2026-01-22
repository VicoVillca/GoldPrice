import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../../core/services/auth.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    BadgeModule,
    MenuModule,
    TooltipModule,
    ThemeToggleComponent
  ]
})
export class ToolbarComponent {
  @Input() title: string = 'Dashboard';
  @Output() toggleSidebar = new EventEmitter<void>();
  
  userMenuItems: MenuItem[] = [
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      command: () => this.openProfile()
    },
    {
      label: 'Configuración',
      icon: 'pi pi-cog',
      command: () => this.openSettings()
    },
    {
      separator: true
    },
    {
      label: 'Cerrar Sesión',
      icon: 'pi pi-sign-out',
      command: () => this.authService.logout()
    }
  ];

  constructor(public authService: AuthService) {}

  private openProfile(): void {
    console.log('Abrir perfil');
    // Navegar a perfil o abrir modal
  }

  private openSettings(): void {
    console.log('Abrir configuración');
    // Navegar a configuración
  }

  getUserInitial(): string {
    const name = this.authService.currentUserValue?.name;
    return name ? name.charAt(0).toUpperCase() : 'A';
  }
}