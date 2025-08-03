import { AbstractCar } from "./abstract-car.model";

export type Car = AbstractCar & {
  readonly model: string;
  readonly brand: string;
  readonly year: number;
}

export type CarColumnKey = Exclude<keyof Car, 'lockedBy'>;
