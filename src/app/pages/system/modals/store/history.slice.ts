import { HistoryCollection } from "../../../../shared/models/car.model";

export type HistorySlice = {
  readonly isEditModalOpen: boolean;
  readonly isAddModalOpen: boolean;
  readonly isDeleteModalOpen: boolean;
  readonly isHistoryModalOpen: boolean;
  readonly selectedCarHistory:  HistoryCollection[]| undefined;
  readonly historyLoading: boolean;
  readonly historyError: string| undefined;
  readonly isCreating: boolean;
  readonly isUpdating: boolean;
  readonly isAddingToHistory: boolean;
  readonly isDeleting: boolean;
}

export const initialHistorySlice: HistorySlice = {
  isEditModalOpen: false,
  isAddModalOpen: false,
  isDeleteModalOpen: false,
  isHistoryModalOpen: false,
  selectedCarHistory: undefined,
  historyLoading: false,
  historyError: undefined,
  isCreating: false,
  isUpdating: false,
  isAddingToHistory: false,
  isDeleting: false,
}
