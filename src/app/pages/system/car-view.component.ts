import { Component, computed, effect, inject, Signal } from '@angular/core';
import { CarStore } from '../../store/car.store';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { first, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EditSvgComponent } from "../../shared/utilities/svgs/edit-svg.component";
import { HistoryViewSvgComponent } from "../../shared/utilities/svgs/history-view-svg.component";
import { ReturnSVGComponent } from "../../shared/utilities/svgs/return-svg.component";
import { MngCarModal } from "./modals/mng-car-modal.component";
import { HistoryViewModalComponent } from "./modals/history-view-modal.component";
import { HistoryStore } from './modals/store/history.store';

@Component({
  selector: 'atp-car-view',
  imports: [CommonModule, EditSvgComponent, HistoryViewSvgComponent, ReturnSVGComponent, RouterModule, MngCarModal, HistoryViewModalComponent],
  template: `
  @let car = carStore.vm().selectedCar;
  @if(car){
    <div class="actions p-2">
      <a class="link btn link__icon link__light link__block" [routerLink]="['/system']" (click)="carStore.setSelectedCarId(undefined)">
        <atp-return-svg/>
      </a>
    </div>
    <div class="container">
      <div class="card">
        <div class="card__header">
          <h1 class="justify-between px-1">
            <span>
              Edited by: {{ car.editedBy }}
            </span>
            <span>
              <button class="btn btn__icon btn__brd-light" (click)="historyStore.openHistoryModal(car.carId)">
                <atp-history-view-svg [fill]="'#F3F3F3'" [stroke]="'#F3F3F3'"/>
              </button>
              <button class="btn btn__icon btn__brd-light" (click)="carStore.openEditModal(car.carId)">
                <atp-edit-svg [stroke]="'#F3F3F3'"/>
              </button>
            </span>
            <span>
              Last Update Date: {{ car.lastUpdateDate | date:'dd/MM/yy HH:mm' }}
            </span>
          </h1>
        </div>
        <div class="card__body flex-container">
          <div class="card">
            <div class="card__header">
              <h2 class="justify-between px-1">
                <span>
                  General
                </span>
              </h2>
            </div>
            <div class="card__body">
              <ul class="list">
                @for(key of carStore.carGeneralKeys(); track key){
                  <li class="list__item">
                    <span class="list__item__title">{{ carStore.allColumnsNamesMapper()[key] + ': ' }}</span><span class="list__item__value">{{ car[key] }}</span>
                  </li>
                }
                @empty {
                  <li class="list__item">
                    No data
                  </li>
                }
              </ul>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <h2 class="justify-between px-1">
                <span>
                  Sales
                </span>
              </h2>
            </div>
            <div class="card__body">
              <ul class="list">
                @for(key of carStore.carSalesKeys(); track key){
                  <li class="list__item">
                    <span class="list__item__title">{{ carStore.allColumnsNamesMapper()[key] + ': ' }}</span><span class="list__item__value">
                      @if(typeof car[key] === 'boolean'){
                        {{ car[key] ? 'Yes' : 'No' }}
                      }
                      @else if(carStore.isDate(car[key])){
                        {{ car[key] | date:'dd/MM/yy'}}
                      }
                      @else if(key == 'transmission'){
                        {{ car[key] == 0 ? 'Manual' : 'Automatical' }}
                      }
                      @else {
                        {{ car[key] }}
                      }
                    </span>
                  </li>
                }
                @empty {
                  <li class="list__item">
                    No data
                  </li>
                }
              </ul>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <h2 class="justify-between px-1">
                <span>
                  Tech
                </span>
              </h2>
            </div>
            <div class="card__body">
              <ul class="list">
                @for(key of carStore.carTechKeys(); track key){
                  <li class="list__item">
                    <span class="list__item__title">{{ carStore.allColumnsNamesMapper()[key] + ': ' }}</span><span class="list__item__value">@if(typeof car[key] === 'boolean'){
                        {{ car[key] ? 'Yes' : 'No' }}
                      }
                      @else if(carStore.isDate(car[key])){
                        {{ car[key] | date:'dd/MM/yy'}}
                      }
                      @else if(key == 'transmission'){
                        {{ car[key] == 0 ? 'Manual' : 'Automatical' }}
                      }
                      @else {
                        {{ car[key] }}
                      }
                    </span>
                  </li>
                }
                @empty {
                  <li class="list__item">
                    No data
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    @if(carStore.isEditModalOpen()){
      <atp-mng-car-modal/>
    }

    @if(historyStore.isHistoryModalOpen()){
      <atp-history-view-modal/>
    }
  }
  `,
  styles: [``],
})
export class CarViewComponent {

  carStore = inject(CarStore);
  historyStore = inject(HistoryStore);
  #route = inject(ActivatedRoute);

  carId = toSignal(this.#route.paramMap.pipe(
    first(),
    map((params) => {
      const id = Number(params.get('carId'));
      this.carStore.setSelectedCarId(id);
      this.historyStore.loadAllHistory();
      return id;
    })
  ));

}
