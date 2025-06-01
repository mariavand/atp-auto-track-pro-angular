import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { authGuard } from './shared/services/auth.guard';
import { AppComponent } from './app.component';

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
    loadChildren: () => import('./pages/system/system.routes').then(m => m.SYSTEM_ROUTES),
    canActivate: [authGuard],
    title: 'System Page',
  },
  {
    path: '**',
    redirectTo: ''
  }
];
