import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { GoldPriceService } from '../../../../core/services/gold-price.service';
import { DecimalPipe, CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-ley',
  standalone: true,
  imports: [DecimalPipe, CommonModule, TableModule, CardModule],
  template: `
    <div class="page-content">
      <div class="header">
        <h1>Precio de Oro por Ley</h1>
        <p>Precios calculados por pureza decimal (1000 - 417)</p>
      </div>

      <p-card>
        <p-table [value]="leyData()" [responsiveLayout]="'scroll'" styleClass="p-datatable-striped">
          <ng-template pTemplate="header">
            <tr>
              <th>Ley (Pureza)</th>
              <th>Precio Gramo (BOB)</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-item>
            <tr>
              <td><span class="font-bold">{{ ( item.ley / 1000 ) | number:'1.3-3'}}</span></td>
              <td><span class="text-primary font-bold">{{ item.price | number:'1.2-2' }} BOB</span></td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </div>
  `,
  styles: [`
    .page-content { padding: 24px; max-width: 1000px; margin: 0 auto; }
    .header { margin-bottom: 24px; }
    .header h1 { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
    .header p { color: var(--text-secondary); }
    .text-primary { color: var(--primary); }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeyComponent {
  goldService = inject(GoldPriceService);
  
  leyData = computed(() => {
    const onza = this.goldService.goldPriceOnza();
    const rate = this.goldService.exchangeRate();
    const gramPrice1000 = (onza / 31.1035) * rate;
    
    const leyes = [];

    for (let i = 1000; i >= 100; i -= 5) {
      leyes.push({ val: i });
    }
    
    return leyes.map(l => ({
      ley: l.val,
      price: gramPrice1000 * (l.val / 1000)
    }));
  });
}
