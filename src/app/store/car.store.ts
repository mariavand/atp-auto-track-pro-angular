import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { initialCarSlice } from './slices/car.slice';
import { computed, inject } from '@angular/core';
import { CarsService } from '../shared/services/cars.service';
export const CarStore = signalStore(
  { providedIn: 'root' },
  withState(initialCarSlice),
  withProps((_) => {
    const carsService = inject(CarsService);
    return {
      carsService
    }
  }),
  withComputed((store) => ({
    vm: computed(() => buildCarVm())
  })),
  withMethods(store => ({

  })),
  withHooks((store) => ({
    onInit: () => {
      const allCars = store.carsService.allCars.value();
      console.log(allCars);
      patchState(store, { cars: allCars })
    }
  })),
  withDevtools('cars-store')
)
