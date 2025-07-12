import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { initialCarSlice } from './car.slice';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { CarsService } from '../shared/services/cars.service';
import { Car, CarColumnKey } from '../shared/models/car.model';
import { Router } from '@angular/router';
import { first, pipe, switchMap, tap } from 'rxjs';
import * as updaters from './car.updaters';
import * as vmBuilders from './car-vm.builders';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
export const CarStore = signalStore(
  { providedIn: 'root' },
  withState(initialCarSlice),
  withProps((_) => {
    const carsService = inject(CarsService);
    const router = inject(Router);
    const http = inject(HttpClient);
    return {
      carsService,
      router,
      http
    }
  }),
  withComputed((store) => ({
    vm: computed(() => vmBuilders.buildCarsVm(store.cars(), store.searchWord())),
    selectedCar: computed(() => vmBuilders.buildSelectedCar(store.selectedCarId(), store.cars())),
    visibleColumns: computed(() => vmBuilders.buildVisibleColumns(store.selectedColumns())),
    anyLoading: computed(() => store.loading() || store.historyLoading() || store.isCreating() || store.isUpdating()),
    // isCarSelected: computed(() => !store.selectedCarId()),
  })),
  withMethods(store => ({
    setSearchWord: (target: any) => {
      patchState(store, updaters.setSearchWord(target.value))
    },
    setCars(cars: Car[]){
      patchState(store, { cars, loading: false, error: undefined })
    },

    setLoading(loading: boolean){
      patchState(store, { loading })
    },

    setError(error: string | undefined){
      patchState(store, { error, loading: false })
    },

    setSelectedCarId(id: number | undefined | null) {
      patchState(store, { selectedCarId: id == null ? undefined : id });
    },

    openEditModal(carId: number | undefined = undefined) {
      patchState(store, { isEditModalOpen: true, selectedCarId: carId });
    },

    closeEditModal() {
      patchState(store, { isEditModalOpen: false, selectedCarId: undefined });
    },

    openHistoryModal(carId: number | undefined) {
      patchState(store, { isHistoryModalOpen: true, selectedCarId: carId });
    },

    closeHistoryModal() {
      patchState(store, { isHistoryModalOpen: false, selectedCarId: undefined, selectedCarHistory: undefined });
    },

    toggleColumnVisibility(columnName: CarColumnKey) {
      patchState(store, (currentState) => ({
        selectedColumns: {
          ...currentState.selectedColumns,
          [columnName]: !currentState.selectedColumns[columnName]
        }
      }));
    },

    setCarHistory(history: History[]) {
      patchState(store, { selectedCarHistory: history, historyLoading: false, historyError: undefined });
    },

    setHistoryLoading(loading: boolean) {
      patchState(store, { historyLoading: loading });
    },

    setHistoryError(error: string | undefined) {
      patchState(store, { historyError: error, historyLoading: false });
    },

    addCar(newCar: Car) {
      patchState(store, (currentState) => ({
        cars: [...currentState.cars, newCar],
        isCreating: false,
        error: undefined
      }));
    },

    updateCarInList(updatedCar: Car) {
      patchState(store, (currentState) => ({
        cars: currentState.cars.map(car =>
          car.carId === updatedCar.carId ? updatedCar : car
        ),
        isUpdating: false,
        error: undefined
      }));
    },

    removeCarFromList(carId: number) {
      patchState(store, (currentState) => ({
        cars: currentState.cars.filter(car => car.carId !== carId),
        loading: false,
        error: undefined,
        selectedCarId: currentState.selectedCarId === carId ? undefined : currentState.selectedCarId
      }));
    },

    isDate(value: any){
      if(typeof value == 'string'){
        const data = new Date(value);
        if(data.toString() != 'Invalid Date'){
          return true;
        }
      }
      return false;
    },

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

  })),
  withHooks(({ loadAllCars }) => ({
    onInit: () => {
      loadAllCars();
    }
  })),
  withDevtools('cars-store')
)
