import { Car } from "../models/car.vm"

export type CarSlice = {
  readonly cars: Car[];
}


export const initialCarSlice = {
  cars: undefined
}
