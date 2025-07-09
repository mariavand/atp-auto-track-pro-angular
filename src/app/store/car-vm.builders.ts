import { Car } from "./models/car.model";

export function buildCarsVm(
  cars: Car[],
  searchWord: string
){

  return {
    filteredCars: buildFilteredCarsList()
  };

  function buildFilteredCarsList(){
    const word = searchWord.trim().toLowerCase();

    return cars.filter(car => {
      let keys =  Object.keys(car);
      let  res: Car[] = [];
      keys.forEach(k => {
        let value = car[k as keyof Car];
        if(value.toString().toLowerCase().includes(word)){
          res = [...res, car];
        }
      });
      return res;
    })
  }

}
