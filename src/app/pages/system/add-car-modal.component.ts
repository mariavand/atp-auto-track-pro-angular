import { Component, computed, inject } from "@angular/core";
import { CloseSVGComponent } from "../../shared/utilities/svgs/close-svg.component";
import { CarStore } from "../../store/car.store";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { SidebarStore } from "../../shared/layout/store/sidebar.store";
import { CustomToggleComponent } from "../../shared/utilities/components/custom-toggle.component";
import { CustomSelectComponent } from "../../shared/utilities/components/custom-select.component";

@Component({
  selector: 'atp-add-car-modal',
  template: `
    <section class="modal">
      <div class="modal__container">
        <div class="card">
          <div class="card__header">
            <h2 class="justify-between px-1">
              <span>
                Add New Car
              </span>
              <span>
                <button class="btn btn__icon btn__brd-light" (click)="closeModal()">
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
                  <div class="carForm__control">
                    <label class="carForm__control__label" for="{{'test'}}">{{ 'Seats' + ': ' }}</label>
                    <atp-custom-select id="{{'test'}}" [options]="options"/>
                  </div>
                  @for(k of generalKeys(); track k){
                    @if(k.includes('Comment')){
                      <div class="carForm__control">
                        <label class="carForm__control__label" for="{{k}}">{{ store.allColumnsNamesMapper()[k] + ': ' }}</label>
                        <textarea class="carForm__control__textarea" name="{{k}}" id="{{k}}"></textarea>
                      </div>
                    }
                    @else {
                      <div class="carForm__control">
                        <label class="carForm__control__label" for="{{k}}">{{ store.allColumnsNamesMapper()[k] + ': ' }}</label>
                        <input class="carForm__control__inputText" type="text" formControlName="{{k}}" name="{{k}}">
                      </div>
                    }
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
                    @if(k.includes('Comment')){
                      <div class="carForm__control">
                        <label class="carForm__control__label" for="{{k}}">{{ store.allColumnsNamesMapper()[k] + ': ' }}</label>
                        <textarea class="carForm__control__textarea" name="{{k}}" id="{{k}}"></textarea>
                      </div>
                    }
                    @else if(k.includes('buyingDay')){
                      <div class="carForm__control">
                        <label class="carForm__control__label" for="{{k}}">{{ store.allColumnsNamesMapper()[k] + ': ' }}</label>
                        <input class="carForm__control__inputText" type="date" formControlName="{{k}}" name="{{k}}">
                      </div>
                    }
                    @else {
                      <div class="carForm__control">
                        <label class="carForm__control__label" for="{{k}}">{{ store.allColumnsNamesMapper()[k] + ': ' }}</label>
                        <input class="carForm__control__inputText" type="text" formControlName="{{k}}" name="{{k}}">
                      </div>
                    }
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
                    @if(k.includes('airConditioning') || k.includes('gps') || k.includes('bluetooth')){
                      <div class="carForm__control">
                        <label class="carForm__control__label" for="{{k}}">{{ store.allColumnsNamesMapper()[k] + ': ' }}</label>
                        <atp-custom-toggle [name]="k"/>
                      </div>
                    }
                    @else if(k.includes('batteryChangeDate')){
                      <div class="carForm__control">
                        <label class="carForm__control__label" for="{{k}}">{{ store.allColumnsNamesMapper()[k] + ': ' }}</label>
                        <input class="carForm__control__inputText" type="date" formControlName="{{k}}" name="{{k}}">
                      </div>
                    }
                    @else if(k.includes('Comment')){
                      <div class="carForm__control">
                        <label class="carForm__control__label" for="{{k}}">{{ store.allColumnsNamesMapper()[k] + ': ' }}</label>
                        <textarea class="carForm__control__textarea" name="{{k}}" id="{{k}}"></textarea>
                      </div>
                    }
                    @else {
                      <div class="carForm__control">
                        <label class="carForm__control__label" for="{{k}}">{{ store.allColumnsNamesMapper()[k] + ': ' }}</label>
                        <input class="carForm__control__inputText" type="text" formControlName="{{k}}" id="{{k}}">
                      </div>
                    }
                  }
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  imports: [CloseSVGComponent, ReactiveFormsModule, CustomToggleComponent, CustomSelectComponent]
})
export class AddCarModal{

  store = inject(CarStore);
  sidebarStore = inject(SidebarStore);

  #fb = inject(FormBuilder);

  keys = this.sidebarStore.carKeys().filter(value => value != 'carId');

  generalKeys = computed(() => this.store.carGeneralKeys().filter(value => value != 'carId'));

  form = this.#fb.group({});

  options = [
    { label: '1 seat', value: 1 },
    { label: '2 seats', value: 2 },
    { label: '3 seats', value: 3 }
  ]

  constructor(){
    console.log('this.keys', this.keys);
    this.keys.forEach((m) => {
      console.log('m', m);
      if(m.includes('airConditioning') || m.includes('gps') || m.includes('blutooth')){
        this.form.addControl(m, this.#fb.control(false));
      }
      // else if(m.includes('')){

      // }
      else{
        this.form.addControl(m, this.#fb.control(''));
      }
    });
    console.log('this.form', this.form);
  }

  f(k: string): FormControl {
    return this.form.get(k) as FormControl;
  }

  closeModal(){
    this.store.closeAddModal();
  }

}
