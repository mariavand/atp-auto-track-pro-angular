import { Car, CarColumnKey } from "../shared/models/car.model"

export type CarSlice = {
  readonly cars: Car[];
  readonly loading: boolean;
  readonly error: string | undefined;
  readonly searchWord: string;
  readonly selectedCarId: number | undefined;
  readonly isEditModalOpen: boolean;
  readonly isAddModalOpen: boolean;
  readonly isHistoryModalOpen: boolean;
  readonly selectedCarHistory:  History[]| undefined;
  readonly historyLoading: boolean;
  readonly historyError: string| undefined;
  readonly isCreating: boolean;
  readonly isUpdating: boolean;
  readonly carGeneralKeys: (keyof Car)[];
  readonly carSalesKeys: (keyof Car)[];
  readonly carTechKeys: (keyof Car)[];
  readonly allColumnsNamesMapper: { [key : string]: string }
}


export const initialCarSlice: CarSlice = {
  cars: [] as Car[],
  loading: true,
  error: undefined,
  searchWord: '',
  selectedCarId: undefined,
  isEditModalOpen: false,
  isAddModalOpen: false,
  isHistoryModalOpen: false,
  selectedCarHistory: undefined,
  historyLoading: false,
  historyError: undefined,
  isCreating: false,
  isUpdating: false,
  carGeneralKeys: ['carId', 'ownerNameSurname', 'serialNumber', 'brand', 'model', 'year', 'status', 'color', 'generalComments'],
  carSalesKeys: ['buyingDay', 'initialPrice', 'finalPrice', 'paymentStatus', 'salesComments'],
  carTechKeys: ['softwareVersion', 'batteryChangeDate', 'airConditioning', 'fuelType', 'seats', 'transmission', 'gps', 'bluetooth', 'techComments'],
  allColumnsNamesMapper: {
    airConditioning: 'Air Conditioner',
    batteryChangeDate: 'Battery Change Date',
    bluetooth: 'Bluetooth',
    brand: 'Brand',
    buyingDay: 'Buying Day',
    carId: 'Id',
    color: 'Color',
    editedBy: 'Edited By',
    finalPrice: 'Final Price',
    fuelType: 'Fuel Type',
    generalComments: 'General Comments',
    gps: 'GPS',
    initialPrice: 'Initial Price',
    lastUpdateDate: 'Last Update Date',
    lockedBy: 'Locked By',
    model: 'Model',
    ownerNameSurname: 'Owner Name & Surname',
    paymentStatus: 'Payment Status',
    salesComments: 'Sales Comments',
    seats: 'Seats',
    serialNumber: 'Serial Number',
    softwareVersion: 'Software Version',
    status: 'Status',
    techComments: 'Tech Comments',
    transmission: 'Transmission',
    year: 'Year'
  }
}
