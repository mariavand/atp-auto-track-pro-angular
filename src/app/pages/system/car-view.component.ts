import { Component, computed, effect, inject, Signal } from '@angular/core';
import { CarStore } from '../../store/car.store';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { first, map } from 'rxjs';
import { Car } from '../../shared/models/car.model';

@Component({
  selector: 'atp-car-view',
  imports: [],
  template: `
  @let car = store.selectedCar();
  @if(car){
    <div class="flex-container">
      <div class="card">
        <div class="card__header">
          <h2>General</h2>
        </div>
        <div class="card__body">
          <ul class="list">
            @for(key of store.carGeneralKeys(); track key){
              <li class="list__item">
                <span class="list__item__title">{{ store.uiColumnsName()[key] + ': ' }}</span><span class="list__item__value">{{ car[key] }}</span>
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
                <span class="list__item__title">{{ store.uiColumnsName()[key] + ': ' }}</span><span class="list__item__value">{{ car[key] }}</span>
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
                <span class="list__item__title">{{ store.uiColumnsName()[key] + ': ' }}</span><span class="list__item__value">{{ car[key] }}</span>
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
  }
  `,
  styles: [``]
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

  // constructor(){
  //   effect(() => {
  //     console.log('store.carGeneralKeys()', this.store.carGeneralKeys());
  //   })
  // }
}
