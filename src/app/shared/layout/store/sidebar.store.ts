import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { initialColumnsSlice } from './sidebar.slice';
import { computed } from '@angular/core';
import { buildSidebarVm } from './sidebar-vm.builders';

export const SidebarStore = signalStore(
  { providedIn: 'root' },
  withState(initialColumnsSlice),
  withComputed((store) => ({
    vm: computed(() => buildSidebarVm(store.defaultColumns())),
  })),
  withMethods(store => ({
    // toggleColumnVisibility(columnName: CarColumnKey) {
    //   patchState(store, (currentState) => ({
    //     selectedColumns: {
    //       ...currentState.selectedColumns,
    //       [columnName]: !currentState.selectedColumns[columnName]
    //     }
    //   }));
    // },
  })),
  withDevtools('sidebar-store')
)
