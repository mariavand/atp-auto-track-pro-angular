import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { initialCarSlice } from './car.slice';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { CarsService } from '../shared/services/cars.service';
import { Car } from '../shared/models/car.model';
import { Router } from '@angular/router';
import { first, pipe, switchMap, tap } from 'rxjs';
import * as updaters from './car.updaters';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { buildCarsVm } from './car-vm.builders';
import { SidebarStore } from '../shared/layout/store/sidebar.store';
import { withEntities } from '@ngrx/signals/entities';

export const CarStore = signalStore(
  { providedIn: 'root' },
  withState(initialCarSlice),
  withProps((_) => {
    const carsService = inject(CarsService);
    const router = inject(Router);
    const http = inject(HttpClient);
    const sidebarStore = inject(SidebarStore);
    return {
      carsService,
      router,
      http,
      sidebarStore
    }
  }),
  withComputed((store) => ({
    vm: computed(() => buildCarsVm(store)),
  })),
  withMethods((store) => ({
    setSearchWord: (target: any) => {
      patchState(store, updaters.setSearchWord(target.value))
    },
    setCars(cars: Car[]){
      patchState(store, updaters.setCars(cars))
    },

    setLoading(loading: boolean){
      patchState(store, updaters.setLoading(loading))
    },

    setError(error: string | undefined){
      patchState(store, updaters.setError(error))
    },

    setSelectedCarId(id: number | undefined | null) {
      patchState(store, updaters.setSelectedCarId(id));
    },

    openEditModal(carId: number | undefined) {
      patchState(store, updaters.openEditModal(carId));
    },

    closeEditModal() {
      patchState(store, updaters.closeEditModal());
    },

    openHistoryModal(carId: number | undefined) {
      patchState(store, updaters.openHistoryModal(carId));
    },

    closeHistoryModal() {
      patchState(store, updaters.closeHistoryModal());
    },

    setCarHistory(history: History[]) {
      patchState(store, updaters.setCarHistory(history));
    },

    setHistoryLoading(loading: boolean) {
      patchState(store, updaters.setHistoryLoading(loading));
    },

    setHistoryError(error: string | undefined) {
      patchState(store, updaters.setHistoryError(error));
    },

    closeAddModal(){
      patchState(store, updaters.closeAddModal());
    },

    openAddModal(){
      patchState(store, updaters.openAddModal());
    },

    // addCar(newCar: Car) {
    //   patchState(store, (currentState) => ({
    //     cars: [...currentState.cars, newCar],
    //     isCreating: false,
    //     error: undefined
    //   }));
    // },

    // updateCarInList(updatedCar: Car) {
    //   patchState(store, (currentState) => ({
    //     cars: currentState.cars.map(car =>
    //       car.carId === updatedCar.carId ? updatedCar : car
    //     ),
    //     isUpdating: false,
    //     error: undefined
    //   }));
    // },

    // removeCarFromList(carId: number) {
    //   patchState(store, (currentState) => ({
    //     cars: currentState.cars.filter(car => car.carId !== carId),
    //     loading: false,
    //     error: undefined,
    //     selectedCarId: currentState.selectedCarId === carId ? undefined : currentState.selectedCarId
    //   }));
    // },

    isDate(value: any){
      return updaters.isDate(value);
    },

  })),
  withMethods((store) => ({
    // --- Effects (Asynchronous operations using rxMethod) ---
    // Effect to load all cars
    loadAllCars: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: undefined })),
        switchMap(() =>
          store.http.get<Car[]>(environment.apiUrl + '/cars').pipe(
            first(),
            tapResponse({
              next: (cars: Car[]) => patchState(store, { cars, loading: false }),
              error: (err: any) => patchState(store, { error: err.message, loading: false }),
            })
          )
        )
      )
    ),

    addNewCar: rxMethod<Omit<Car, 'carId'>>(
      pipe(
        tap(() => patchState(store, { isCreating: true, error: undefined })),
        switchMap((newCarData) =>
          store.http.post<Car>(environment.apiUrl + '/cars', newCarData).pipe(
            first(),
            tapResponse({
              next: (createdCar) => {
                patchState(store, (currentState) => ({
                  cars: [...currentState.cars, createdCar],
                  isCreating: false,
                  error: undefined,
                  selectedCarId: createdCar.carId
                }));
                store.closeAddModal();
                store.router.navigate(['/cars', createdCar.carId]);
              },
              error: (err: any) => {
                patchState(store, { error: err.message, isCreating: false });
              }
            })
          )
        )
      )
    )
  })),
  withHooks(({ loadAllCars }) => ({
    onInit: () => {
      loadAllCars();
    }
  })),
  withDevtools('cars-store')
)
