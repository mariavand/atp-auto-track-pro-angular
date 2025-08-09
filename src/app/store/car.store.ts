import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { initialCarSlice } from './car.slice';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { Car, History, HistoryCollection } from '../shared/models/car.model';
import { Router } from '@angular/router';
import { concatMap, first, of, pipe, switchMap, tap } from 'rxjs';
import * as updaters from './car.updaters';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { buildCarsVm } from './car-vm.builders';
import { SidebarStore } from '../shared/layout/store/sidebar.store';
import { ToastrService } from 'ngx-toastr';

export const CarStore = signalStore(
  { providedIn: 'root' },
  withState(initialCarSlice),
  withProps((_) => {
    const router = inject(Router);
    const http = inject(HttpClient);
    const sidebarStore = inject(SidebarStore);
    const toastr = inject(ToastrService);
    return {
      router,
      http,
      sidebarStore,
      toastr
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

    setSelectedCarIdToBeDeleted(id: number | undefined | null) {
      patchState(store, updaters.setSelectedCarIdToBeDeleted(id));
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

    closeDeleteModal(){
      patchState(store, updaters.closeDeleteModal());
    },

    openDeleteModal(){
      patchState(store, updaters.openDeleteModal());
    },

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
              error: (err: any) => {
                console.log('err', err);
                store.toastr.error('Something went wrong!', err.statusText);;
                patchState(store, { error: err.message, loading: false })
              },
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
              },
              error: (err: any) => {
                console.log('err', err);
                store.toastr.error('Something went wrong!', err.statusText);;
                patchState(store, { error: err.message, isCreating: false });
              }
            })
          )
        )
      )
    ),

    deleteCar: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { isDeleting: true, error: undefined })),
        switchMap((carId: number) =>
          store.http.delete<Car>(environment.apiUrl + '/cars/' + carId).pipe(
            first(),
            tapResponse({
              next: (value) => {
                patchState(store, (currentState) => ({
                  cars: [...currentState.cars.filter(car => car.carId != carId)],
                  isDeleting: false,
                  error: undefined
                }));
                store.closeDeleteModal();
              },
              error: (err: any) => {
                console.log('err', err);
                store.toastr.error('Something went wrong!', err.statusText);
                patchState(store, { error: err.message, isDeleting: false });
              }
            })
          )
        )
      )
    ),

    saveEditedCar: rxMethod<{ old: Omit<History, 'historyId'>, new: Omit<Car, 'carId'> }>(
      pipe(
        tap(() => patchState(store, { isAddingToHistory: true, error: undefined })),
        tap(() => patchState(store, { isUpdating: true, error: undefined })),
        switchMap((carData) => {
          let concatApis = store.http.post<Car>(environment.apiUrl + '/history', carData.old).pipe(
            first(),
            tapResponse({
              next: () => {
                patchState(store, () => ({
                  isAddingToHistory: false,
                  error: undefined,
                }));
              },
              error: (err: any) => {
                console.log('err', err);
                store.toastr.error('Something went wrong!', err.statusText);
                patchState(store, { error: err.message, isAddingToHistory: false });
              }
            })
          )

          return concatApis.pipe(
            concatMap(() =>
              store.http.put<Car>(environment.apiUrl + '/cars/' + store.selectedCarId()!, carData.new).pipe(
                first(),
                tapResponse({
                  next: (editedCar) => {
                    let cars = store.cars().filter((c) => c.carId != store.selectedCarId())
                    patchState(store, () => ({
                      cars: [...cars, editedCar],
                      isUpdating: false,
                      error: undefined,
                      selectedCarId: editedCar.carId
                    }));
                    store.closeEditModal();
                  },
                  error: (err: any) => {
                    console.log('err', err);
                    store.toastr.error('Something went wrong!', err.statusText);
                    patchState(store, { error: err.message, isUpdating: false });
                  }
                })
              )
            )
          );
        }



        )
      )
    ),

    // addHistory: rxMethod<Omit<Car, 'carId'>>(
    //   pipe(
    //     tap(() => patchState(store, { isAddingToHistory: true, error: undefined })),
    //     switchMap((oldCarData) =>
    //       store.http.post<Car>(environment.apiUrl + '/cars', oldCarData).pipe(
    //         first(),
    //         tapResponse({
    //           next: () => {
    //             patchState(store, () => ({
    //               isAddingToHistory: false,
    //               error: undefined,
    //             }));
    //           },
    //           error: (err: any) => {
    //             console.log('err', err);
    //             store.toastr.error('Something went wrong!', err.statusText);
    //             patchState(store, { error: err.message, isAddingToHistory: false });
    //           }
    //         })
    //       )
    //     )
    //   )
    // )
  })),
  withHooks(({ loadAllCars }) => ({
    onInit: () => {
      loadAllCars();
    }
  })),
  withDevtools('cars-store')
)
