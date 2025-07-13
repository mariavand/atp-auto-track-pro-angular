import { Component, computed, effect, inject, Signal } from '@angular/core';
import { CarStore } from '../../store/car.store';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { first, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'atp-car-view',
  imports: [CommonModule],
  template: `
  @let car = store.vm().selectedCar;
  @if(car){
    <div class="container">
      <div class="card">
        <div class="card__header">
          <h1 class="justify-between">
            <span>
              Edited by: {{ car.editedBy }}
            </span>
            <span>
              Last Update Date: {{ car.lastUpdateDate | date:'dd/MM/yy HH:mm' }}
            </span>
          </h1>
        </div>
        <div class="card__body flex-container">
          <div class="card">
            <div class="card__header">
              <h2>General</h2>
            </div>
            <div class="card__body">
              <ul class="list">
                @for(key of store.carGeneralKeys(); track key){
                  <li class="list__item">
                    <span class="list__item__title">{{ store.allColumnsNamesMapper()[key] + ': ' }}</span><span class="list__item__value">{{ car[key] }}</span>
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
              <h2>Sales</h2>
            </div>
            <div class="card__body">
              <ul class="list">
                @for(key of store.carSalesKeys(); track key){
                  <li class="list__item">
                    <span class="list__item__title">{{ store.allColumnsNamesMapper()[key] + ': ' }}</span><span class="list__item__value">
                      @if(typeof car[key] === 'boolean'){
                        {{ car[key] ? 'Yes' : 'No' }}
                      }
                      @else if(store.isDate(car[key])){
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
              <h2>Tech</h2>
            </div>
            <div class="card__body">
              <ul class="list">
                @for(key of store.carTechKeys(); track key){
                  <li class="list__item">
                    <span class="list__item__title">{{ store.allColumnsNamesMapper()[key] + ': ' }}</span><span class="list__item__value">@if(typeof car[key] === 'boolean'){
                        {{ car[key] ? 'Yes' : 'No' }}
                      }
                      @else if(store.isDate(car[key])){
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
  }
  `,
  styles: [``],
})
export class CarViewComponent {

  store = inject(CarStore);
  #route = inject(ActivatedRoute);

  carId = toSignal(this.#route.paramMap.pipe(
    first(),
    map((params) => {
      const id = Number(params.get('carId'));
      this.store.setSelectedCarId(id)
      return id;
    })
  ));

}
