import { Signal } from "@angular/core";
import { Car, CarColumnKey } from "../shared/models/car.model";

export function buildCarsVm(
  cars: Car[],
  searchWord: string
){
  return {
    filteredCars: buildFilteredCarsList() ?? []
  };

  function buildFilteredCarsList(){
    const word = searchWord.trim().toLowerCase();
    let res: Car[] = [];

    if(searchWord != ''){
      cars.forEach(car => {
        let keys =  Object.keys(car);
        keys.forEach(k => {
          let value = car[k as keyof Car];
          if(value.toString().toLowerCase().includes(word)){
            if(res.find((val) => val.carId == car.carId) == undefined){
              res = [...res, car];
            }
          }
        });
      })
      return res;
    }
    else{
      return cars;
    }
  }

}

export function buildSelectedCar(carId: number | undefined, cars: Car[]){
  if(carId == undefined || cars == undefined) return undefined;
  return cars.find(car => car.carId == carId);
}

export function buildVisibleColumns(columns: Record<CarColumnKey, boolean>){
  const allKeys: CarColumnKey[] = Object.keys(columns) as CarColumnKey[];
  return allKeys.filter(key => columns[key]);
}
