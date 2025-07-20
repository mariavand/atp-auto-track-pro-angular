import { Component, computed, inject } from "@angular/core";
import { CloseSVGComponent } from "../../shared/utilities/svgs/close-svg.component";
import { CarStore } from "../../store/car.store";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { SidebarStore } from "../../shared/layout/store/sidebar.store";
import { CustomToggleComponent } from "../../shared/utilities/components/custom-toggle.component";

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
            <form class="form flex-container" [formGroup]="form">
              <div class="card">
                <div class="card__header">
                  <h2 class="px-1">
                    <span>General</span>
                  </h2>
                </div>
                <div class="card__body">
                  @for(k of generalKeys(); track k){
                    @if(k.includes('Comment')){
                      <div class="form__control">
                        <label class="form__control__label" for="{{k}}">{{ store.allColumnsNamesMapper()[k] + ': ' }}</label>
                        <textarea class="form__control__textarea" name="{{k}}" id="{{k}}"></textarea>
                      </div>
                    }
                    @else {
                      <div class="form__control">
                        <label class="form__control__label" for="{{k}}">{{ store.allColumnsNamesMapper()[k] + ': ' }}</label>
                        <input class="form__control__inputText" type="text" formControlName="{{k}}" name="{{k}}">
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
                      <div class="form__control">
                        <label class="form__control__label" for="{{k}}">{{ store.allColumnsNamesMapper()[k] + ': ' }}</label>
                        <textarea class="form__control__textarea" name="{{k}}" id="{{k}}"></textarea>
                      </div>
                    }
                    @else {
                      <div class="form__control">
                        <label class="form__control__label" for="{{k}}">{{ store.allColumnsNamesMapper()[k] + ': ' }}</label>
                        <input class="form__control__inputText" type="text" formControlName="{{k}}" name="{{k}}">
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
                      <div class="form__control">
                        <label class="form__control__label" for="{{k}}">{{ store.allColumnsNamesMapper()[k] + ': ' }}</label>
                        <atp-custom-toggle [name]="k"/>
                      </div>
                    }
                    @else if(k.includes('Comment')){
                      <div class="form__control">
                        <label class="form__control__label" for="{{k}}">{{ store.allColumnsNamesMapper()[k] + ': ' }}</label>
                        <textarea class="form__control__textarea" name="{{k}}" id="{{k}}"></textarea>
                      </div>
                    }
                    @else {
                      <div class="form__control">
                        <label class="form__control__label" for="{{k}}">{{ store.allColumnsNamesMapper()[k] + ': ' }}</label>
                        <input class="form__control__inputText" type="text" formControlName="{{k}}" id="{{k}}">
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
  imports: [CloseSVGComponent, ReactiveFormsModule, CustomToggleComponent]
})
export class AddCarModal{

  store = inject(CarStore);
  sidebarStore = inject(SidebarStore);

  #fb = inject(FormBuilder);

  keys = this.sidebarStore.carKeys().filter(value => value != 'carId');

  generalKeys = computed(() => this.store.carGeneralKeys().filter(value => value != 'carId'));

  form = this.#fb.group({});

  constructor(){
    console.log('this.keys', this.keys);
    this.keys.forEach((m) => {
      this.form.addControl(m, this.#fb.control(''));
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
