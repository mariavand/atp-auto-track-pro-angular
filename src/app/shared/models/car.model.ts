import { AbstractCar } from "./abstract-car.model";

export type Car = AbstractCar & {
  readonly model: string;
  readonly brand: string;
  readonly year: number;
  readonly lockedBy: string;
}

export type CarColumnKey = Exclude<keyof Car, 'lockedBy'>;

export type History = Omit<Car, "lockedBy" | "seats" | "model" | "brand" | "year">;

export type HistoryCollection = Car & {
  readonly historyId: number;
}
