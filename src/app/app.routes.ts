import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { DashboardComponent } from './features/admin/pages/dashboard/dashboard.component';
import { JoyasComponent } from './features/admin/pages/joyas/joyas.component';
import { LeyComponent } from './features/admin/pages/ley/ley.component';
import { LetrasComponent } from './features/admin/pages/letras/letras.component';
import { UsersComponent } from './features/admin/pages/users/users.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'joyas', component: JoyasComponent },
      { path: 'ley', component: LeyComponent },
      { path: 'letras', component: LetrasComponent },
      { path: 'mapa-oro', loadComponent: () => import('./features/admin/pages/mapa-oro/mapa-oro.component').then(m => m.MapaOroComponent) },
      { path: 'usuario', loadComponent: () => import('./features/admin/pages/usuario/usuario.component').then(m => m.UsuarioComponent) },
      { path: 'users', component: UsersComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];
