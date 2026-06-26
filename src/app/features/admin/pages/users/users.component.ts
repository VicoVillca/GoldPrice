import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TableModule, CardModule],
  template: `
    <div class="page-content">
      <div class="header">
        <h1>Gestión de Usuarios</h1>
        <p>Administra los accesos al sistema</p>
      </div>

      <p-card>
        <p-table [value]="users" [responsiveLayout]="'scroll'" styleClass="p-datatable-striped">
          <ng-template pTemplate="header">
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Rol</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-user>
            <tr>
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td><span class="role-badge">{{ user.role }}</span></td>
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
    .role-badge { background: var(--primary); color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px; text-transform: uppercase; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  userService = inject(UserService);
  users = [
    { id: '1', username: 'vicovillca', role: 'admin' },
    { id: '2', username: 'operador1', role: 'user' }
  ];
}
