import { Component, OnInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { AuthService } from '../../../../core/services/auth.service';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ToastModule,
    SidebarComponent,
    ToolbarComponent
  ],
  providers: [MessageService]
})
export class MainLayoutComponent implements OnInit {
  pageTitle: string = 'Dashboard';
  currentYear: number;
  isMobile: boolean = false;
  mobileSidebarVisible: boolean = false;  // Controla el sidebar móvil

  private router = inject(Router);
  private messageService = inject(MessageService);
  public authService = inject(AuthService);
  public themeService = inject(ThemeService);

  constructor() {
    this.currentYear = new Date().getFullYear();
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.updatePageTitle();
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updatePageTitle();
      });
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    // Cerrar sidebar móvil si cambia a desktop
    if (!this.isMobile) {
      this.mobileSidebarVisible = false;
    }
  }

  private updatePageTitle(): void {
    const currentRoute = this.router.routerState.root.firstChild;
    if (currentRoute) {
      const routeData = currentRoute.snapshot.data;
      this.pageTitle = routeData['title'] || 'Dashboard';
    }
  }

  // Se llama desde el toolbar en móviles
  toggleMobileSidebar(): void {
    this.mobileSidebarVisible = !this.mobileSidebarVisible;
  }

  // Cierra el sidebar móvil
  closeMobileSidebar(): void {
    this.mobileSidebarVisible = false;
  }

  // Para el avatar en el sidebar móvil
  getUserInitial(): string {
    const name = this.authService.currentUserValue?.name;
    return name ? name.charAt(0).toUpperCase() : 'A';
  }

  logout(): void {
    this.authService.logout();
    this.messageService.add({
      severity: 'info',
      summary: 'Sesión cerrada',
      detail: 'Has cerrado sesión exitosamente'
    });
  }
}