import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ViewSvgComponent } from "../../shared/utilities/svgs/view-svg.component";
import { SearchSvgComponent } from "../../shared/utilities/svgs/search-svg.component";
import { DeleteSvgComponent } from "../../shared/utilities/svgs/delete-svg.component";
import { RouterModule } from "@angular/router";
import { CarStore } from "../../store/car.store";
import { AddSVGComponent } from "../../shared/utilities/svgs/add-svg.component";
import { EditSvgComponent } from "../../shared/utilities/svgs/edit-svg.component";
import { MngCarModal } from "./modals/mng-car-modal.component";
import { DeleteCarModal } from "./modals/delete-car-modal.component";

@Component({
  selector: 'atp-cars-table',
  template: `
    @let vm = store.vm();

    <section class="filters">
      <div class="filters__input-container">
        <button class="btn btn__icon btn__brd-light" (click)="this.store.openAddModal()">
          <atp-add-svg/>
        </button>
        <label for="filters-search" class="filters__label-icon">
          <atp-search-svg/>
        </label>
        <input class="filters__search" type="text" id="filters-search" (keyup)="store.setSearchWord($event.target)">
      </div>
    </section>
    <div class="table__wrapper">
      <table class="table">
        <tr class="table__tr">
          @if(vm.visibleColumns){
            <th class="table__th">
              Actions
            </th>
            @for(key of vm.visibleColumns; track key){
                <th class="table__th">
                  {{ store.allColumnsNamesMapper()[key] }}
                </th>
            }
            @empty {
                <th class="table__th">
                  #
                </th>
            }
          }
        </tr>

        @for(car of vm.filteredCars; track car){
          <tr class="table__tr">
            <td class="table__td">
              <a class="link btn link__icon" [routerLink]="['car', car.carId]">
                <atp-view-svg/>
              </a>
              <button class="btn btn__icon" (click)="this.store.openEditModal(car.carId)">
                <atp-edit-svg/>
              </button>
              <button class="btn btn__icon" (click)="store.setSelectedCarIdToBeDeleted(car.carId); store.openDeleteModal();">
                <atp-delete-svg/>
              </button>
            </td>
            @for(key of vm.visibleColumns; track key){
              <td class="table__td">
                @if(typeof car[key] === 'boolean'){
                  {{ car[key] ? 'Yes' : 'No' }}
                }
                @else if(store.isDate(car[key]) && key != 'softwareVersion'){
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
          </tr>
        }
        @empty {
          <tr class="table__tr">
            <td class="table__td">
              No cars
            </td>
          </tr>
        }
      </table>

    </div>

    @if(store.isAddModalOpen() || store.isEditModalOpen()){
      <atp-mng-car-modal/>
    }

    @if(store.isDeleteModalOpen()){
      <atp-delete-car-modal/>
    }
  `,
  imports: [CommonModule, ViewSvgComponent, SearchSvgComponent, DeleteSvgComponent, RouterModule, AddSVGComponent, EditSvgComponent, MngCarModal, DeleteCarModal]
})
export class CarsTableComponent {

  store = inject(CarStore);

  constructor(){
    if(!!this.store.vm().filteredCars){
      this.store.loadAllCars();
    }
  }

}
