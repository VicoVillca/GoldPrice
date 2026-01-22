import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
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
    ToolbarModule,
    ButtonModule,
    SidebarModule,
    AvatarModule,
    MenuModule,
    ToastModule,
    SidebarComponent,
    ToolbarComponent
  ],
  providers: [MessageService]
})
export class MainLayoutComponent implements OnInit {
  sidebarVisible: boolean = true;
  pageTitle: string = 'Dashboard';
  currentYear: number

  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.currentYear = new Date().getFullYear();
    // Escuchar cambios de ruta para actualizar título
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updatePageTitle();
      });
  }

  ngOnInit(): void {
    this.updatePageTitle();
  }

  private updatePageTitle(): void {
    const currentRoute = this.router.routerState.root.firstChild;
    if (currentRoute) {
      const routeData = currentRoute.snapshot.data;
      this.pageTitle = routeData['title'] || 'Dashboard';
    }
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
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