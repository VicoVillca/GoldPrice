import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GoldPriceService } from '../../../core/services/gold-price.service';
import { LayoutService } from '../../../core/services/layout.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, CommonModule, DecimalPipe, FormsModule, TagModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  goldService = inject(GoldPriceService);
  layout = inject(LayoutService);
}
