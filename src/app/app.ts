import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { GoldPriceService } from './core/services/gold-price.service';
import { AuthService } from './core/services/auth.service';
import { LayoutService } from './core/services/layout.service';
import { CommonModule } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, CommonModule],
  template: `
    @if (auth.isAuthenticated()) {
      <div class="admin-layout">
        <app-sidebar />
        
        <div class="main-wrapper" [class.collapsed]="layout.isCollapsed()">
          <app-header />
          
          <main class="content-area">
            <router-outlet />
            
            @if (goldService.error()) {
              <div class="alert alert-error" style="display: block; position: static; margin-top: 20px; max-width: 100%;">
                {{ goldService.error() }}
              </div>
            }
          </main>
        </div>
      </div>
    } @else {
      <router-outlet />
    }
  `,
  styleUrl: './app.css',
})
export class App implements OnInit {
  goldService = inject(GoldPriceService);
  auth = inject(AuthService);
  layout = inject(LayoutService);

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.goldService.fetchPrice();
    }
  }
}
