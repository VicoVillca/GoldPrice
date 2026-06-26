import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-shared-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  template: `
    <p-table [value]="data" [responsiveLayout]="'scroll'" styleClass="p-datatable-striped">
      <ng-template pTemplate="header">
        <tr>
          @for (col of columns; track col.field) {
            <th>{{ col.header }}</th>
          }
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-rowData>
        <tr>
          @for (col of columns; track col.field) {
            <td>{{ rowData[col.field] }}</td>
          }
        </tr>
      </ng-template>
    </p-table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input() data: Record<string, unknown>[] = [];
  @Input() columns: { field: string, header: string }[] = [];
}
