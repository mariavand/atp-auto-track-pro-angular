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

    console.log('word', word);

    if(searchWord() != ''){
      cars().forEach(car => {
        let keys =  Object.keys(car);
        console.log('boo', word);
        keys.forEach(k => {
          let value = car[k as keyof Car];
          console.log('value', value);
          if(value.toString().toLowerCase().includes(word)){
            console.log('res.find((val) => val.carId == car.carId', res.find((val) => val.carId == car.carId))
            console.log('value', value);
            if(res.find((val) => val.carId == car.carId) == undefined){
              res = [...res, car];
            }
          }
        });
        console.log('buildFilteredCarsList', res);
      })
      return res;
    }
    else{
      return cars();
    }
  }

}
