import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { initialCarSlice } from './car.slice';
import { inject } from '@angular/core';
import { CarsService } from '../../shared/services/cars.service';
export const CarShop = signalStore(
  { providedIn: 'root' },
  withState(initialCarSlice),
  withProps((_) => {
    const carsService = inject(CarsService);
    return {
      carsService
    }
  }),
  withHooks((store) => ({
    onInit: () => {
      store.carsService.allCars.value
    }
  })),
  withDevtools('cars-store')
)
