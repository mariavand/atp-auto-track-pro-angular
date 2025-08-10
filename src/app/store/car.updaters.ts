import { Car, History, HistoryCollection } from "../shared/models/car.model";
import { CarSlice } from "./car.slice";
import { PartialStateUpdater } from "@ngrx/signals";

export function setSearchWord(searchWord: string): PartialStateUpdater<CarSlice>{
  return _ => ({ searchWord })
}

export function setCars(cars: Car[]): PartialStateUpdater<CarSlice>{
  return _ => ({ cars, loading: false, error: undefined })
}

export function setLoading(loading: boolean): PartialStateUpdater<CarSlice>{
  return _ => ({ loading })
}

export function setError(error: string | undefined): PartialStateUpdater<CarSlice>{
  return _ => ({ error, loading: false })
}

export function setSelectedCarId(id: number | undefined | null): PartialStateUpdater<CarSlice>{
  return _ => ({ selectedCarId: id == null ? undefined : id })
}

export function setSelectedCarIdToBeDeleted(id: number | undefined | null): PartialStateUpdater<CarSlice>{
  return _ => ({ selectedCarIdToBeDeleted: id == null ? undefined : id })
}

export function openEditModal(carId: number | undefined): PartialStateUpdater<CarSlice>{
  return _ => ({ isEditModalOpen: true, selectedCarId: carId })
}

export function closeEditModal(): PartialStateUpdater<CarSlice>{
  return _ => ({ isEditModalOpen: false })
}

export function closeAddModal(): PartialStateUpdater<CarSlice>{
  return _ => ({ isAddModalOpen: false })
}

export function openAddModal(): PartialStateUpdater<CarSlice>{
  return _ => ({ isAddModalOpen: true })
}

export function closeDeleteModal(): PartialStateUpdater<CarSlice>{
  return _ => ({ isDeleteModalOpen: false })
}

export function openDeleteModal(): PartialStateUpdater<CarSlice>{
  return _ => ({ isDeleteModalOpen: true })
}

export function isDate(value: any){
  if(typeof value == 'string'){
    const data = new Date(value);
    if(data.toString() != 'Invalid Date'){
      return true;
    }
  }
  return false;
}
