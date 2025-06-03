import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { authGuard } from './shared/services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: AuthComponent,
    title: 'Home Page'
  },
  {
    path: 'system',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/system/system.routes').then(m => m.SYSTEM_ROUTES),
    title: 'System Page',
  },
  {
    path: '**',
    redirectTo: ''
  }
];
