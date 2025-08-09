import { PartialStateUpdater } from "@ngrx/signals"
import { HistorySlice } from "./history.slice"
import { HistoryCollection } from "../../../../shared/models/car.model"

export function openHistoryModal(carId: number | undefined): PartialStateUpdater<HistorySlice>{
  return _ => ({ isHistoryModalOpen: true, selectedCarId: carId })
}

export function closeHistoryModal(): PartialStateUpdater<HistorySlice>{
  return _ => ({ isHistoryModalOpen: false, selectedCarId: undefined, selectedCarHistory: undefined })
}

export function setCarHistory(history: HistoryCollection[]): PartialStateUpdater<HistorySlice>{
  return _ => ({ selectedCarHistory: history, historyLoading: false, historyError: undefined })
}

export function setHistoryLoading(loading: boolean): PartialStateUpdater<HistorySlice>{
  return _ => ({ historyLoading: loading })
}

export function setHistoryError(error: string | undefined): PartialStateUpdater<HistorySlice>{
  return _ => ({ historyError: error, historyLoading: false })
}
