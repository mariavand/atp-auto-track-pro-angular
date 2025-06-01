import { AbstractCar } from "./abstract-car.vm";

export type Car = AbstractCar & {
  readonly model: string;
  readonly brand: string;
  readonly year: number;
}
