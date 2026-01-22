import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    ButtonModule,
    TooltipModule
  ]
})
export class SidebarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard',
      command: () => this.closeSidebar()
    },
    {
      label: 'Componente 1',
      icon: 'pi pi-box',
      routerLink: '/componente1',
      command: () => this.closeSidebar()
    },
    {
      label: 'Componente 2',
      icon: 'pi pi-cog',
      routerLink: '/componente2',
      command: () => this.closeSidebar()
    },
    {
      separator: true
    },
    {
      label: 'Configuración',
      icon: 'pi pi-sliders-h',
      items: [
        {
          label: 'Perfil',
          icon: 'pi pi-user',
          routerLink: '/profile'
        },
        {
          label: 'Ajustes',
          icon: 'pi pi-wrench',
          routerLink: '/settings'
        }
      ]
    }
  ];

  constructor(public authService: AuthService) {}

  onLogout(): void {
    this.authService.logout();
  }

  closeSidebar(): void {
    this.toggleSidebar.emit();
  }
}