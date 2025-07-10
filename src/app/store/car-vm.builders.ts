import { Signal } from "@angular/core";
import { Car } from "../shared/models/car.model";

export function buildCarsVm(
  cars: Signal<Car[]>,
  searchWord: Signal<string>
){
  console.log('filteredCars', buildFilteredCarsList());
  return {
    filteredCars: buildFilteredCarsList() ?? []
  };

  function buildFilteredCarsList(){
    const word = searchWord().trim().toLowerCase();
    let res: Car[] = [];

    if(word != ''){
      return cars().forEach(car => {
        let keys =  Object.keys(car);
        console.log('boo');
        keys.forEach(k => {
          let value = car[k as keyof Car];
          if(value.toString().toLowerCase().includes(word)){
            if(res.find((val) => val.carId == car.carId) == undefined){
              res = [...res, car];
            }
          }
        });
        console.log('buildFilteredCarsList', res);
        return res;
      })
    }
    else{
      return cars()
    }
  }

}
