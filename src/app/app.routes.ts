import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    title: 'Authentication Page'
  },
  {
    path: '/system',
    loadComponent: () => import('./pages/system/system.component').then(m => m.SystemComponent),
    title: 'Home Page'
  }
];
