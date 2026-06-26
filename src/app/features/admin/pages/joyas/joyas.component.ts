import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { GoldPriceService } from '../../../../core/services/gold-price.service';
import { DecimalPipe, CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-joyas',
  standalone: true,
  imports: [DecimalPipe, CommonModule, TableModule, CardModule],
  templateUrl: './joyas.component.html',
  styleUrls: ['./joyas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JoyasComponent {
  goldService = inject(GoldPriceService);
  
  karatData = computed(() => {
    const onza = this.goldService.goldPriceOnza();
    const rate = this.goldService.exchangeRate();
    const gramPrice24K = (onza / 31.1035) * rate;
    
    const karats = [24, 22, 18, 16, 14, 10];
    return karats.map(k => ({
      karat: k,
      purity: (k / 24) * 100 - 2,
      price: (gramPrice24K * ((k / 24) * 100 - 2) * 0.94) / 100
    }));
  });
}
