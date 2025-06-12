import { Component, effect, inject } from "@angular/core";
import { CarsService } from "../../shared/services/cars.service";
import { Car } from "../../store/models/car.vm";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'atp-cars-table',
  template: `

    <div class="table__wrapper">
      <table class="table">
        <tr class="table__tr">
          @for(key of getCarKeys(); track key){
              <th class="table__th">
                {{ columnMapper[key] }}
              </th>
          }
          @empty {
              <th class="table__th">
                #
              </th>
          }
        </tr>

        <tr class="table__tr">
          @for(car of cars(); track car){
            @for(key of getCarKeys(); track key){
              <td class="table__td">
                @if(typeof car[key] === 'boolean'){
                  {{ car[key] ? 'Yes' : 'No' }}
                }
                @else if(isDate(car[key])){
                  {{ car[key] | date:'dd/MM/YY'}}
                }
                @else if(key == 'transmission'){
                  {{ car[key] == 0 ? 'Manual' : 'Automatical' }}
                }
                @else {
                  {{ car[key] }}
                }
              </td>
            }
          }
          @empty {
              <td class="table__td">
                No cars
              </td>
          }
        </tr>
      </table>
    </div>

  `,
  imports: [CommonModule]
})
export class CarsTableComponent {

  #carsService = inject(CarsService);

  cars = this.#carsService.allCars.value;

  columnMapper: { [key : string]: string } = this.#carsService.allColumnsNamesMapper;

  constructor(){
    effect(() => {
      console.log(this.cars());
    })
  }

  getCarKeys(){
    return Object.keys(this.cars()?.[0] ?? []) as (keyof Car)[];
  }

  isDate(value: any){
    console.log(typeof value);
    return value instanceof Date;
  }

}
