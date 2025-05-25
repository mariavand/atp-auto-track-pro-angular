import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { authGuard } from './shared/services/auth.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    component: AuthComponent,
    title: 'Authentication Page'
  },
  {
    path: 'system',
    loadChildren: () => import('./pages/system/system.routes').then(m => m.SYSTEM_ROUTES),
    title: 'Home Page',
  },
  {
    path: '**',
    redirectTo: ''
  }
];
