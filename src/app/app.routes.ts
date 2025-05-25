import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { authGuard } from './shared/services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth'
  },
  {
    path: '/auth',
    component: AuthComponent,
    title: 'Authentication Page'
  },
  {
    path: '/system',
    loadComponent: () => import('./pages/system/system.component').then(m => m.SystemComponent),
    title: 'Home Page',
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
