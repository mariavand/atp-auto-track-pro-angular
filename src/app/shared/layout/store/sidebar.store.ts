import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { initialColumnsSlice } from './sidebar.slice';
import { CarColumnKey } from '../../models/car.model';

export const SidebarStore = signalStore(
  { providedIn: 'root' },
  withState(initialColumnsSlice),
  withComputed((store) => ({
    // vm: computed(() => buildSidebarVm(store.defaultColumns())),
  })),
  withMethods(store => ({
    saveColumns(newColumns: Record<CarColumnKey, boolean>){
      localStorage.setItem('columns', JSON.stringify(newColumns));
      patchState(store, { defaultColumns: newColumns })
    },

    initializeColumns(defaultColumns: Record<CarColumnKey, boolean>){

      let finalColumns = defaultColumns;

      let localySaved = JSON.parse(localStorage.getItem('columns')!);

      // console.log('localySaved', localySaved);
      if(localySaved != null){
        finalColumns = localySaved;
      }
      patchState(store, { defaultColumns: finalColumns } )
    }
  })),
  withHooks((store) => ({
    onInit: () => {
      store.initializeColumns(store.defaultColumns())
    }
  })),
  withDevtools('sidebar-store')
)
