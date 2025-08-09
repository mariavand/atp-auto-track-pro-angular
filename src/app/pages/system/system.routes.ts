import { Routes } from '@angular/router';
import { SystemComponent } from './system.component';
import { CarViewComponent } from './car-view.component';
export const SYSTEM_ROUTES: Routes = [
  {
    path: '',
    component: SystemComponent,
  },
  {
    path: 'car/:carId',
    component: CarViewComponent,
  }
]
