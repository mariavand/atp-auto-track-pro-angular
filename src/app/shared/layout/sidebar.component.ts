import { ChangeDetectionStrategy, Component, effect, EventEmitter, inject, input, InputSignal, model, ModelSignal, output, OutputEmitterRef } from '@angular/core';
import { CloseSVGComponent } from '../utilities/svgs/close-svg.component';
import { CustomCheckboxComponent } from "../utilities/components/custom-checkbox.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SidebarStore } from './store/sidebar.store';
import { CarStore } from '../../store/car.store';

@Component({
  selector: 'atp-sidebar',
  imports: [CloseSVGComponent, CustomCheckboxComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  @if(isSidebarOpen()){
    <div class="sidebar sidebar__wrapper">
      <div class="sidebar__container">
        <div class="sidebar__actions">
          <button class="btn btn__icon btn__brd-light" (click)="onCloseSidebar()">
            <atp-close-svg />
          </button>
        </div>

        <form class="form" [formGroup]="f">
          <div class="form__all">
            <atp-custom-checkbox [label]="'Select All'" (change)="updateColumnsCheckboxes(!!f.get('selectAll')?.value)" formControlName="selectAll"/>
          </div>
          <div class="form__subcollection" formGroupName="columns">
            @for(key of store.carKeys(); track $index){
              <atp-custom-checkbox [label]="carStore.allColumnsNamesMapper()[key]" formControlName="{{key}}" (change)="saveColumns()"/>
            }
          </div>
        </form>
      </div>
    </div>
  }
  `,
  styles: [``]
})
export class SidebarComponent {

  store = inject(SidebarStore);
  carStore = inject(CarStore);
  #fb = inject(FormBuilder);

  isSidebarOpen = input();
  isSidebarOpenChange: OutputEmitterRef<boolean> = output();

  f = this.#fb.group({
    selectAll: false,
    columns: this.#fb.group({})
  })

  constructor(){
    effect(() => {
      this.store.carKeys().forEach((k) => {
        this.col.addControl(k, this.#fb.control(false));
      })

      console.log('f', this.f);
    })
  }

  get col(): FormGroup {
    return this.f.get('columns') as FormGroup;
  }

  onCloseSidebar(){
    this.isSidebarOpenChange.emit(false);
  }

  updateColumnsCheckboxes(val: boolean){
    this.store.carKeys().forEach((k) => {
      this.col.get(k)?.patchValue(val);
    });
    this.saveColumns();
  }

  saveColumns(){
    console.log(this.f.value);
  }

}
