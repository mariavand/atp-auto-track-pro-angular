import { AbstractCar } from "./abstract-car.vm";

export type History = AbstractCar & {
  readonly historyId: number;
}
