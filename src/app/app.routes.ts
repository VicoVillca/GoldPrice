import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { MainLayoutComponent } from './components/features/main-layout/main-layout.component';
import { PrecioOroComponent } from './components/layout/precio-oro/precio-oro.component';
import { OroJoyasComponent } from './components/layout/oro-joyas/oro-joyas.component';
import { OroPepasComponent } from './components/layout/oro-pepas/oro-pepas.component';
import { LetrasComponent } from './components/layout/letras/letras.component';
import { OroLeyComponent } from './components/layout/oro-ley/oro-ley.component';


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
        redirectTo: 'precio-oro',
        pathMatch: 'full'
      },
      {
        path: 'precio-oro',
        component: PrecioOroComponent,
        data: { title: 'Precio del Oro' }
      },
      {
        path: 'oro-joyas',
        component: OroJoyasComponent,
        data: { title: 'Oro en joyas' }
      },
      {
        path: 'oro-pepas',
        component: OroPepasComponent,
        data: { title: 'Oro en Pepas' }
      },
      {
        path: 'oro-ley',
        component: OroLeyComponent,
        data: { title: 'Oro Ley' }
      },
      {
        path: 'letras',
        component: LetrasComponent,
        data: { title: 'Letras' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'precio-oro'
  }
];