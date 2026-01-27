import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
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
    ButtonModule
  ]
})
export class SidebarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    {
      label: '',
      escape: true,
      items: [
        {
          label: 'Precio del Oro',
          icon: 'pi pi-dollar', // Dinero/Valor
          routerLink: ['/precio-oro'],
          escape: true,
          command: () => this.closeSidebar()
        },
        {
          label: 'Oro en Joyas',
          icon: 'pi pi-crown', // Joya/gema
          routerLink: ['/oro-joyas'],
          escape: true,
          command: () => this.closeSidebar()
        },
        {
          label: 'Oro en Pepas',
          icon: 'pi pi-apple', // Fruta/forma redondeada (pepas)
          routerLink: ['/oro-pepas'],
          escape: true,
          command: () => this.closeSidebar()
        },
        {
          label: 'Oro Ley',
          icon: 'pi pi-apple', // Fruta/forma redondeada (pepas)
          routerLink: ['/oro-ley'],
          escape: true,
          command: () => this.closeSidebar()
        },
        {
          label: 'Letras',
          icon: 'pi pi-file-edit', // Documento/escritura
          routerLink: ['/letras'],
          escape: true,
          command: () => this.closeSidebar()
        }
      ]
    }
  ];

  constructor(public authService: AuthService) {}

  onLogout(): void {
    this.authService.logout();
  }

  closeSidebar(): void {
    console.log("Cerrando sidebar desde el menú");
    this.toggleSidebar.emit();
  }
}