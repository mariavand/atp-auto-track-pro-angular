import { Component, inject } from "@angular/core";
import { CarStore } from "../../store/car.store";
import { CloseSVGComponent } from "../../shared/utilities/svgs/close-svg.component";

@Component({
  selector: 'atp-delete-car-modal',
  template: `
    @let carId = store.selectedCarIdToBeDeleted();
    <section class="modal">
      <div class="modal__container">
        <div class="card">
          <div class="card__header">
            <h2 class="justify-between px-1">
              <span>
                Delete Car
              </span>
              <span>
                <button class="btn btn__icon btn__brd-light" (click)="store.closeDeleteModal()">
                  <atp-close-svg/>
                </button>
              </span>
            </h2>
          </div>
          <div class="card__body">

            <div class="p-2 text-size-1-6">
              Are you sure you want to delete the car with id {{ carId }}?
            </div>
            <div class="d-flex p-2">
              <button class="btn__cancel btn__action" type="click" (click)="deleteCar(carId)">
                <div class="btn__text-wrapper">
                  Delete
                </div>
              </button>
              <button class="btn__cancel btn__action" type="click" (click)="store.closeDeleteModal()">
                <div class="btn__text-wrapper">
                  Cancel
                </div>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  `,
  imports: [CloseSVGComponent]
})
export class DeleteCarModal{

  store = inject(CarStore);

  deleteCar(carId: number | undefined){
    this.store.deleteCar(carId as number);
  }

}
