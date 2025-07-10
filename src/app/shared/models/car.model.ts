import { AbstractCar } from "./abstract-car.model";

export type Car = AbstractCar & {
  readonly model: string;
  readonly brand: string;
  readonly year: number;
}

export type EditableCarFields = Omit<Car, 'carId' | 'model' | 'brand' | 'year'>

export type CarColumnKey = Exclude<keyof Car, 'lockedBy'>;
