import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { MainLayoutComponent } from './components/features/main-layout/main-layout.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { Componente1Component } from './components/layout/componente1/componente1.component';
import { Componente2Component } from './components/layout/componente2/componente2.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
      },
      {
        path: 'componente1',
        component: Componente1Component,
        data: { title: 'Componente 1' }
      },
      {
        path: 'componente2',
        component: Componente2Component,
        data: { title: 'Componente 2' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];