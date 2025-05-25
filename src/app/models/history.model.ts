import { AbstractCar } from "./abstract-car.model";

export type History = AbstractCar & {
  readonly historyId: number;
}
