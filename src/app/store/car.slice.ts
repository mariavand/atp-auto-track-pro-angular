import { Car, CarColumnKey } from "../shared/models/car.model"

export type CarSlice = {
  readonly cars: Car[];
  readonly loading: boolean;
  readonly error: string | undefined;
  readonly searchWord: string;
  readonly selectedCarId: number | undefined;
  // readonly selectedCar: Car;
  readonly selectedColumns: Record<CarColumnKey, boolean>;
  readonly isEditModalOpen: boolean;
  readonly isHistoryModalOpen: boolean;
  readonly selectedCarHistory:  History[]| undefined;
  readonly historyLoading: boolean;
  readonly historyError: string| undefined;
  readonly isCreating: boolean;
  readonly isUpdating: boolean;

}


export const initialCarSlice: CarSlice = {
  cars: [] as Car[],
  loading: true,
  error: undefined,
  searchWord: '',
  selectedCarId: undefined,
  // selectedCar: undefined,
  selectedColumns: {
    ownerNameSurname: true,
    serialNumber: true,
    softwareVersion: true,
    techComments: true,
    buyingDay: true,
    editedBy: true,
    lastUpdateDate: true,
    lockedBy: true,
    generalComments: true,
    salesComments: true,
    batteryChangeDate: true,
    paymentStatus: true,
    finalPrice: true,
    initialPrice: true,
    airConditioning: true,
    fuelType: true,
    seats: true,
    transmission: true,
    gps: true,
    bluetooth: true,
    status: true,
    color: true,
    carId: true,
    model: true,
    brand: true,
    year: true,
  },
  isEditModalOpen: false,
  isHistoryModalOpen: false,
  selectedCarHistory: undefined,
  historyLoading: false,
  historyError: undefined,
  isCreating: false,
  isUpdating: false,
}
