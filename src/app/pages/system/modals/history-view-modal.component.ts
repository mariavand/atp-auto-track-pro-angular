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

              @let currentCarHStatus = $index == historyStore.selectedCarHistory()!.length - 1 ? carStore.vm().selectedCar : historyStore.selectedCarHistory()![$index + 1];

              <div class="card">
                <div class="card__header">
                  <h3 class="justify-between px-1">
                    <span>
                      Edited by: {{ carH.editedBy }}
                    </span>
                    <span>
                      Last Update Date: {{ carH.lastUpdateDate | date:'dd/MM/yy HH:mm' }}
                    </span>
                  </h3>
                </div>
                <div class="card__body flex-container">
                  <div class="card">
                    <div class="card__header">
                      <h4 class="justify-between px-1">
                        <span>
                          General
                        </span>
                      </h4>
                    </div>
                    <div class="card__body">
                      <ul class="list">
                        @for(key of historyStore.carGeneralKeys(); track key){
                          <li class="list__item">
                            <span class="list__item__title">{{ carStore.allColumnsNamesMapper()[key] + ': ' }}</span>
                            <span class="list__item__value"
                              [ngClass]="{ 'red-crossedout': carH[key] !== currentCarHStatus[key] }"
                            >{{ carH[key] }}</span>
                            @if(carH[key] !== currentCarHStatus[key]){
                              <span class="teal">
                                {{ currentCarHStatus[key] }}
                              </span>
                            }
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
                      <h4 class="justify-between px-1">
                        <span>
                          Sales
                        </span>
                      </h4>
                    </div>
                    <div class="card__body">
                      <ul class="list">
                        @for(key of historyStore.carSalesKeys(); track key){
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
                            @if(carH[key] !== currentCarHStatus[key]){
                              <span class="teal">
                                {{ currentCarHStatus[key] }}
                              </span>
                            }
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
                      <h4 class="justify-between px-1">
                        <span>
                          Tech
                        </span>
                      </h4>
                    </div>
                    <div class="card__body">
                      <ul class="list">
                        @for(key of historyStore.carTechKeys(); track key){
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
                            @if(carH[key] !== currentCarHStatus[key]){
                              <span class="teal">
                                {{ currentCarHStatus[key] }}
                              </span>
                            }
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

  constructor(){
    console.log('carStore.vm().selectedCar', this.carStore.vm().selectedCar);
  }

}
