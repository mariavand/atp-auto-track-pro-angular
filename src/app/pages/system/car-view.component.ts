import { Component, effect, inject } from '@angular/core';
import { CarStore } from '../../store/car.store';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { first, map } from 'rxjs';

@Component({
  selector: 'atp-car-view',
  imports: [],
  template: `
  @if(store.selectedCar()){
    boo
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

}
