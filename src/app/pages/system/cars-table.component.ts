import { Component, effect, inject } from "@angular/core";
import { CarsService } from "../../shared/services/cars.service";
import { Car } from "../../shared/models/car.model";
import { CommonModule } from "@angular/common";
import { ViewSvgComponent } from "../../shared/utilities/svgs/view-svg.component";
import { SearchSvgComponent } from "../../shared/utilities/svgs/search-svg.component";
import { DeleteSvgComponent } from "../../shared/utilities/svgs/delete-svg.component";
import { RouterModule } from "@angular/router";
import { CarStore } from "../../store/car.store";

@Component({
  selector: 'atp-cars-table',
  template: `
  @let vm = store.vm();

    <section class="filters">
      <div class="filters__input-container">

        <label for="filters-search" class="filters__label-icon">
          <atp-search-svg/>
        </label>
        <input class="filters__search" type="text" id="filter-search" (keyup)="store.setSearchWord($event.target)">


      </div>
    </section>
    <div class="table__wrapper">
      <table class="table">
        <tr class="table__tr">
          @if(store.visibleColumns()){
            <th class="table__th">
              Actions
            </th>
            @for(key of store.visibleColumns(); track key){
                <th class="table__th">
                  {{ columnMapper[key] }}
                </th>
            }
            @empty {
                <th class="table__th">
                  #
                </th>
            }
          }
        </tr>

        <tr class="table__tr">
          @if(vm.filteredCars.length){
            @for(car of vm.filteredCars; track car){
              <td class="table__td">
                <a class="link btn link__icon" [routerLink]="['car', car.carId]">
                  <atp-view-svg/>
                </a>
                <button class="btn btn__icon">
                  <atp-delete-svg/>
                </button>
              </td>
              @for(key of store.visibleColumns(); track key){
                <td class="table__td">
                  @if(typeof car[key] === 'boolean'){
                    {{ car[key] ? 'Yes' : 'No' }}
                  }
                  @else if(isDate(car[key])){
                    {{ car[key] | date:'dd/MM/yy'}}
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
          }
        </tr>
      </table>
    </div>

  `,
  imports: [CommonModule, ViewSvgComponent, SearchSvgComponent, DeleteSvgComponent, RouterModule]
})
export class CarsTableComponent {

  #carsService = inject(CarsService);
  store = inject(CarStore);

  columnMapper: { [key : string]: string } = this.#carsService.allColumnsNamesMapper;

  constructor(){
    effect(() => {
      console.log(this.store.cars());
      console.log('store', this.store);
    })
  }

  getCarKeys(){
    return Object.keys(this.store.cars()?.[0] ?? []) as (keyof Car)[];
  }

  isDate(value: any){
    if(typeof value == 'string'){
      const data = new Date(value);
      if(data.toString() != 'Invalid Date'){
        return true;
      }
    }
    return false;
  }

}
