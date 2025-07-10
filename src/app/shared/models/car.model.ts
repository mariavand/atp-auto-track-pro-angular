import { AbstractCar } from "./abstract-car.model";

export type Car = AbstractCar & {
  readonly model: string;
  readonly brand: string;
  readonly year: number;
}

export type EditableCarFields = Omit<Car, 'carId' | 'model' | 'brand' | 'year'>

export type CarColumnKey = Exclude<keyof Car, 'lockedBy'>;

type CarGeneral = Pick<Car, 'carId' | 'ownerNameSurname' | 'serialNumber' | 'paymentStatus' | 'status' | 'color' | 'generalComments'>;

export type CarGeneralKeys = keyof CarGeneral;

type CarSales = Pick<Car, 'buyingDay' | 'initialPrice' | 'finalPrice' | 'paymentStatus' | 'salesComments'>;

export type CarSalesKeys = keyof CarSales;

type CarTech = Pick<Car, 'softwareVersion' | 'batteryChangeDate' | 'airConditioning' | 'fuelType' | 'seats' | 'transmission' | 'gps'| 'bluetooth' | 'techComments'>;

export type CarTechKeys = keyof CarTech;
