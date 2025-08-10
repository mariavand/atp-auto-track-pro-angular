import { Component, inject } from '@angular/core';
import { CarStore } from '../../../store/car.store';
import { CommonModule } from '@angular/common';
import { CloseSVGComponent } from "../../../shared/utilities/svgs/close-svg.component";
import { HistoryStore } from './store/history.store';

@Component({
  selector: 'atp-history-view-modal',
  imports: [CommonModule, CloseSVGComponent],
  template: `
  <section class="modal">
      <div class="modal__container">
        <div class="card">
          <div class="card__header">
            <h2 class="justify-between px-1">
              <span>
                Car History
              </span>
              <span>
                <button class="btn btn__icon btn__brd-light" (click)="historyStore.closeHistoryModal()">
                  <atp-close-svg/>
                </button>
              </span>
            </h2>
          </div>
          <div class="card__body card__body__scrollable py-1">
            @for(carH of historyStore.selectedCarHistory(); track carH){

              @let currentCarHStatus = $index == 0 ? carStore.vm().selectedCar : historyStore.selectedCarHistory()![$index - 1];

              <div class="card">
                <div class="card__header">
                  <h3 class="justify-between px-1 gap">
                    <span>
                      Edited by: {{ carH.editedBy }}
                    </span>
                    <span>
                      Last Update Date: {{ carH.lastUpdateDate | date:'dd/MM/yy HH:mm' }}
                    </span>
                  </h3>
                </div>
                <div class="card__body flex-container">
                  <ul class="list">
                    @for(key of historyStore.carGeneralKeys(); track key){
                      @if(carH[key] !== currentCarHStatus[key]){
                        <li class="list__item">
                          <span class="list__item__title">{{ carStore.allColumnsNamesMapper()[key] + ': ' }}</span>
                          <span class="list__item__value"
                            [ngClass]="{ 'red-crossedout': carH[key] !== currentCarHStatus[key] }"
                          >{{ carH[key] }}</span>
                          <span class="green">
                            {{ currentCarHStatus[key] }}
                          </span>
                        </li>
                      }
                    }
                    @for(key of historyStore.carSalesKeys(); track key){
                      @if(carH[key] !== currentCarHStatus[key]){
                        <li class="list__item">
                          <span class="list__item__title">{{ carStore.allColumnsNamesMapper()[key] + ': ' }}</span>
                          <span class="list__item__value" [ngClass]="{ 'red-crossedout': carH[key] !== currentCarHStatus[key] }">
                            @if(typeof carH[key] === 'boolean'){
                              {{ carH[key] ? 'Yes' : 'No' }}
                            }
                            @else if(carStore.isDate(carH[key])){
                              {{ carH[key] | date:'dd/MM/yy'}}
                            }
                            @else if(key == 'transmission'){
                              {{ carH[key] == 0 ? 'Manual' : 'Automatical' }}
                            }
                            @else {
                              {{ carH[key] }}
                            }
                          </span>
                            <span class="green">
                              {{ currentCarHStatus[key] }}
                            </span>
                        </li>
                      }
                    }
                    @for(key of historyStore.carTechKeys(); track key){
                      @if(carH[key] !== currentCarHStatus[key]){
                        <li class="list__item">
                          <span class="list__item__title">{{ carStore.allColumnsNamesMapper()[key] + ': ' }}</span>
                          <span class="list__item__value" [ngClass]="{ 'red-crossedout': carH[key] !== currentCarHStatus[key] }">
                            @if(typeof carH[key] === 'boolean'){
                              {{ carH[key] ? 'Yes' : 'No' }}
                            }
                            @else if(carStore.isDate(carH[key])){
                              {{ carH[key] | date:'dd/MM/yy'}}
                            }
                            @else if(key == 'transmission'){
                              {{ carH[key] == 0 ? 'Manual' : 'Automatical' }}
                            }
                            @else {
                              {{ carH[key] }}
                            }
                          </span>

                          <span class="green">
                            {{ currentCarHStatus[key] }}
                          </span>
                        </li>
                      }
                    }
                  </ul>
                </div>
              </div>
            }
            @empty {
              <div class="card">
                <div class="card__header">
                  <h3 class="px-1">
                    There is no any changes
                  </h3>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
  </section>
  `,
  styles: [``],
})
export class HistoryViewModalComponent {

  historyStore = inject(HistoryStore);
  carStore = inject(CarStore);

}
