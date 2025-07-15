import { Car, CarColumnKey } from "../../models/car.model"

export type ColumnsSlice = {
  readonly defaultColumns: Record<CarColumnKey, boolean>,
  readonly carKeys: (keyof Car)[];
}

export const initialColumnsSlice: ColumnsSlice = {
  defaultColumns: {
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
  carKeys: ['carId', 'ownerNameSurname', 'serialNumber', 'paymentStatus', 'status', 'color', 'generalComments', 'buyingDay', 'initialPrice', 'finalPrice', 'paymentStatus', 'salesComments', 'softwareVersion', 'batteryChangeDate', 'airConditioning', 'fuelType', 'seats', 'transmission', 'gps', 'bluetooth', 'techComments'],
}
