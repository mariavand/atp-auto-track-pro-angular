import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import * as updaters from './history.updaters';
import { initialHistorySlice } from './history.slice';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { CarStore } from '../../../../store/car.store';
import { HttpClient } from '@angular/common/http';
import { HistoryCollection } from '../../../../shared/models/car.model';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { first, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { environment } from '../../../../environments/environment.prod';

export const HistoryStore = signalStore(
  { providedIn: 'root' },
  withState(initialHistorySlice),
  withProps((_) => {
    const toastr = inject(ToastrService);
    const carStore = inject(CarStore);
    const http = inject(HttpClient);

    return {
      toastr,
      carStore,
      http
    }
  }),
  withMethods((store) => ({

    openHistoryModal(carId: number | undefined) {
      patchState(store, updaters.openHistoryModal(carId));
    },

    closeHistoryModal() {
      patchState(store, updaters.closeHistoryModal());
    },

    setCarHistory(history: HistoryCollection[]) {
      patchState(store, updaters.setCarHistory(history));
    },

    setHistoryLoading(loading: boolean) {
      patchState(store, updaters.setHistoryLoading(loading));
    },

    setHistoryError(error: string | undefined) {
      patchState(store, updaters.setHistoryError(error));
    },

    loadAllHistory: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { historyLoading: true, historyError: undefined })),
        switchMap((_) =>
          store.http.get<HistoryCollection[]>(environment.apiUrl + '/history/' + store.carStore.selectedCarId()).pipe(
            first(),
            tapResponse({
              next: (historyCollection: HistoryCollection[]) => patchState(store, { selectedCarHistory: historyCollection, historyLoading: false }),
              error: (err: any) => {
                console.log('err', err);
                store.toastr.error('Something went wrong!', err.statusText);;
                patchState(store, { historyError: err.message, historyLoading: false })
              },
            })
          )
        )
      )
    ),
  })),
  withDevtools('history-store')
)
