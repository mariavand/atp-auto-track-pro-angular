import { Car, CarColumnKey } from "../shared/models/car.model";
import { CarVM } from "./car.vm";

export function buildCarsVm(
  store: any
): CarVM{
  return {
    filteredCars: buildFilteredCarsList() ?? [],
    selectedCar: buildSelectedCar(store.selectedCarId(), store.cars()) ?? {} as Car,
    visibleColumns: buildVisibleColumns(store.sidebarStore.defaultColumns()),
  };

  function buildFilteredCarsList(){
    const word = store.searchWord().trim().toLowerCase();
    let res: Car[] = [];

    if(store.searchWord() != ''){
      store.cars().forEach((car: Car) => {
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
      return store.cars();
    }
  }

  function buildSelectedCar(carId: number | undefined, cars: Car[]){
    if(carId == undefined || carId == null || cars == undefined) return undefined;
    return cars.find(car => car.carId == carId);
  }

  function buildVisibleColumns(columns: Record<CarColumnKey, boolean>){
    if(columns){
      const allKeys: CarColumnKey[] = Object.keys(columns) as CarColumnKey[];
      return allKeys.filter(key => columns[key]);
    }
    return undefined;
  }


}

