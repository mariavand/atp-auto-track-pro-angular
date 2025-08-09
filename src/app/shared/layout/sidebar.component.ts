import { ChangeDetectionStrategy, Component, effect, EventEmitter, inject, input, InputSignal, model, ModelSignal, output, OutputEmitterRef } from '@angular/core';
import { CloseSVGComponent } from '../utilities/svgs/close-svg.component';
import { CustomCheckboxComponent } from "../utilities/components/custom-checkbox.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SidebarStore } from './store/sidebar.store';
import { CarStore } from '../../store/car.store';
import { CarColumnKey } from '../models/car.model';

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
            @for(key of sidebarStore.carKeys(); track $index){
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

  sidebarStore = inject(SidebarStore);
  carStore = inject(CarStore);
  #fb = inject(FormBuilder);

  isSidebarOpen = input();
  isSidebarOpenChange: OutputEmitterRef<boolean> = output();

  f = this.#fb.group({
    selectAll: false,
    columns: this.#fb.group({})
  });

  constructor(){
    effect(() => {
      let flag = true;
      this.sidebarStore.carKeys().forEach((k) => {
        this.col.addControl(k, this.#fb.control(this.sidebarStore.defaultColumns()[k as CarColumnKey]));
        flag = this.sidebarStore.defaultColumns()[k as CarColumnKey]
      })
      this.f.get('selectAll')?.patchValue(flag);
    })
  }

  get col(): FormGroup {
    return this.f.get('columns') as FormGroup;
  }

  onCloseSidebar(){
    this.isSidebarOpenChange.emit(false);
  }

  updateColumnsCheckboxes(val: boolean){
    this.sidebarStore.carKeys().forEach((k) => {
      this.col.get(k)?.patchValue(val);
    });
    this.saveColumns();
  }

  saveColumns(){
    this.sidebarStore.saveColumns(this.f.controls.columns.value as Record<CarColumnKey, boolean>);
  }

}
