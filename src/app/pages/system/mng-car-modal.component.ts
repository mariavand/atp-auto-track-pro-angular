import { Component, computed, inject, Signal } from "@angular/core";
import { CloseSVGComponent } from "../../shared/utilities/svgs/close-svg.component";
import { CarStore } from "../../store/car.store";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { SidebarStore } from "../../shared/layout/store/sidebar.store";
import { CustomToggleComponent } from "../../shared/utilities/components/custom-toggle.component";
import { CustomSelectComponent } from "../../shared/utilities/components/custom-select.component";
import { Car, History } from "../../shared/models/car.model";
import { AuthService, User } from "@auth0/auth0-angular";
import { toSignal } from "@angular/core/rxjs-interop";
import { first } from "rxjs";

@Component({
  selector: 'atp-mng-car-modal',
  template: `
    <section class="modal">
      <div class="modal__container">
        <div class="card">
          <div class="card__header">
            <h2 class="justify-between px-1">
              <span>
                {{ store.isAddModalOpen() ? 'Add New Car' : 'Edit Car'}}
              </span>
              <span>
                <button class="btn btn__icon btn__brd-light" (click)="store.isAddModalOpen() ? store.closeAddModal() : store.closeEditModal()">
                  <atp-close-svg/>
                </button>
              </span>
            </h2>
          </div>
          <div class="card__body">
            <form class="carForm" [formGroup]="form">
              <div class="card">
                <div class="card__header">
                  <h2 class="px-1">
                    <span>General</span>
                  </h2>
                </div>
                <div class="card__body">
                  @for(k of generalKeys(); track k){
                    <div class="carForm__control">
                      <label class="carForm__control__label" for="{{k}}">{{ store.allColumnsNamesMapper()[k] + ': ' }}</label>
                      @if(k.includes('Comment')){
                        <textarea class="carForm__control__textarea" formControlName="{{k}}" name="{{k}}" id="{{k}}"></textarea>
                      }
                      @else if(k.includes('status')){
                        <atp-custom-select id="{{k}}" formControlName="{{k}}" [options]="statusOptions"/>
                      }
                      @else {
                        <input class="carForm__control__inputText" type="text" formControlName="{{k}}" name="{{k}}">
                      }
                    </div>
                  }
                </div>
              </div>

              <div class="card">
                <div class="card__header">
                  <h2 class="px-1">
                    <span>Sales</span>
                  </h2>
                </div>
                <div class="card__body">
                  @for(k of store.carSalesKeys(); track k){
                    <div class="carForm__control">
                      <label class="carForm__control__label" for="{{k}}">{{ store.allColumnsNamesMapper()[k] + ': ' }}</label>
                      @if(k.includes('Comment')){
                        <textarea class="carForm__control__textarea" formControlName="{{k}}" name="{{k}}" id="{{k}}"></textarea>
                      }
                      @else if(k.includes('paymentStatus')){
                        <atp-custom-select id="{{k}}" formControlName="{{k}}" [options]="paymentStatusOptions"/>
                      }
                      @else if(k.includes('buyingDay')){
                        <input class="carForm__control__inputText" type="date" formControlName="{{k}}" name="{{k}}">
                      }
                      @else {
                        <input class="carForm__control__inputText" type="text" formControlName="{{k}}" name="{{k}}">
                      }
                    </div>
                  }
                </div>
              </div>

              <div class="card">
                <div class="card__header">
                  <h2 class="px-1">
                    <span>Tech</span>
                  </h2>
                </div>
                <div class="card__body">
                  @for(k of store.carTechKeys(); track k){
                    <div class="carForm__control">
                      <label class="carForm__control__label" for="{{k}}">{{ store.allColumnsNamesMapper()[k] + ': ' }}</label>
                      @if(k.includes('airConditioning') || k.includes('gps') || k.includes('bluetooth')){
                        <atp-custom-toggle [name]="k" formControlName="{{k}}"/>
                      }
                      @else if(k.includes('batteryChangeDate')){
                        <input class="carForm__control__inputText" type="date" formControlName="{{k}}" name="{{k}}">
                      }
                      @else if(k.includes('fuelType')){
                        <atp-custom-select id="{{k}}" formControlName="{{k}}" [options]="fuelTypeOptions"/>
                      }
                      @else if(k.includes('seats')){
                        <atp-custom-select id="{{k}}" formControlName="{{k}}" [options]="seatsOptions"/>
                      }
                      @else if(k.includes('transmission')){
                        <atp-custom-select id="{{k}}" formControlName="{{k}}" [options]="transmissionOptions"/>
                      }
                      @else if(k.includes('Comment')){
                        <textarea class="carForm__control__textarea" formControlName="{{k}}" name="{{k}}" id="{{k}}"></textarea>
                      }
                      @else {
                        <input class="carForm__control__inputText" type="text" formControlName="{{k}}" id="{{k}}">
                      }
                    </div>
                  }
                </div>
              </div>

              <div class="carForm__actions">
                <button class="btn__submit btn__action" type="click" (click)="saveCar()">
                  <div class="btn__text-wrapper">
                    Save
                  </div>
                </button>
                <button class="btn__cancel btn__action" type="click" (click)="store.isAddModalOpen() ? store.closeAddModal() : store.closeEditModal()">
                  <div class="btn__text-wrapper">
                    Cancel
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  imports: [CloseSVGComponent, ReactiveFormsModule, CustomToggleComponent, CustomSelectComponent]
})
export class MngCarModal{

  store = inject(CarStore);
  sidebarStore = inject(SidebarStore);
  authService = inject(AuthService);

  user: Signal<User | null | undefined> = toSignal(this.authService.user$.pipe(first()));

  #fb = inject(FormBuilder);

  keys = this.sidebarStore.carKeys().filter(value => value != 'carId');

  generalKeys = computed(() => this.store.carGeneralKeys().filter(value => value != 'carId'));

  form = this.#fb.group({});

  selectedCar = computed(() => this.store.vm().selectedCar)

  constructor(){
    this.keys.forEach((m) => {
      if(m.includes('airConditioning') || m.includes('gps') || m.includes('blutooth')){
        this.form.addControl(m, this.#fb.control(this.selectedCar()[m] ?? false));
      }
      else{
        if(!m.includes('Comments')){
          this.form.addControl(m, this.#fb.control(this.selectedCar()[m] ?? '', [Validators.required]));
        }
        else{
          this.form.addControl(m, this.#fb.control(this.selectedCar()[m] ?? '', []));
        }
      }
    });
  }

  f(k: string): FormControl {
    return this.form.get(k) as FormControl;
  }

  saveCar(){
    let car: Omit<Car, 'carId'> = {} as Omit<Car, 'carId'>;

    car = this.form.value as Omit<Car, 'carId'>;
    car = {...car, editedBy: this.user()?.name as string};
    car = {...car, lastUpdateDate: new Date()};
    car = {...car, lockedBy: ' '};
    console.log('this.store.isAddModalOpen()', this.store.isAddModalOpen());
    if(this.store.isAddModalOpen()){
      this.store.addNewCar(car);
    }
    else{
      let originalCar = this.selectedCar();
      const { seats, model, brand, year, ...old } = originalCar;
      this.store.saveEditedCar({ old, new: car });
    }
  }

  seatsOptions = [
    { label: '1 seat', value: 1 },
    { label: '2 seats', value: 2 },
    { label: '3 seats', value: 3 },
    { label: '4 seats', value: 4 },
    { label: '5 seats', value: 5 }
  ];

  paymentStatusOptions = [
    { label: 'Not Paid', value: 'Not Paid' },
    { label: 'In progress', value: 'In progress' },
    { label: 'Paid', value: 'Paid' },
  ];

  statusOptions = [
    { label: 'Available', value: 'Available' },
    { label: 'Not Available', value: 'Not Available' },
  ];

  transmissionOptions = [
    { label: 'Manual', value: 0 },
    { label: 'Automatic', value: 1 },
  ];

  fuelTypeOptions = [
    { label: 'Electric', value: 'Electric' },
    { label: 'Hybrid', value: 'Hybrid' },
    { label: 'Diesel', value: 'Diesel' },
    { label: 'Gasoline', value: 'Gasoline' },
  ];

}
