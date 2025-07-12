import { Car, CarColumnKey } from "../shared/models/car.model"

export type CarSlice = {
  readonly cars: Car[];
  readonly loading: boolean;
  readonly error: string | undefined;
  readonly searchWord: string;
  readonly selectedCarId: number | undefined;
  readonly selectedColumns: Record<CarColumnKey, boolean>;
  readonly isEditModalOpen: boolean;
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
  // selectedCar: undefined,
  selectedColumns: {
    ownerNameSurname: true,
    serialNumber: true,
    softwareVersion: true,
    techComments: true,
    buyingDay: true,
    editedBy: true,
    lastUpdateDate: true,
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
  carGeneralKeys: ['carId', 'ownerNameSurname', 'serialNumber', 'paymentStatus', 'status', 'color', 'generalComments'],
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
