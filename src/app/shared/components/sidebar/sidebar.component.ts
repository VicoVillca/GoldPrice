import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GoldPriceService } from '../../../core/services/gold-price.service';
import { AuthService } from '../../../core/services/auth.service';
import { LayoutService } from '../../../core/services/layout.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  goldService = inject(GoldPriceService);
  auth = inject(AuthService);
  layout = inject(LayoutService);
  
  closeSidebar() {
    if (typeof window !== 'undefined' && window.innerWidth < 992) {
      this.layout.isMobileOpen.set(false);
    }
  }
}
