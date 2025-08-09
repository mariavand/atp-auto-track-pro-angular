import { Car, CarColumnKey } from "../shared/models/car.model"

export type CarVM = {
  filteredCars: Car[],
  selectedCar: Car,
  visibleColumns: CarColumnKey[] | undefined,
}
