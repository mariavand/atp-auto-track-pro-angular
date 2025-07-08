import { Car } from "../models/car.model"

export type CarSlice = {
  readonly cars: Car[];
}


export const initialCarSlice = {
  cars: undefined
}
