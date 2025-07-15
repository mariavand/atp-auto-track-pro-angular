import { Component, CUSTOM_ELEMENTS_SCHEMA, forwardRef, input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'atp-custom-checkbox',
  template: `
    <div class="checkbox-wrapper-57">
      <label class="checkbox-container">
        <input type="checkbox" [ngModel]="checked" (ngModelChange)="onModelChange($event)">
        <div class="checkmark"></div>
        {{ label() }}
      </label>
    </div>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [FormsModule, ReactiveFormsModule],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomCheckboxComponent),
      multi: true
    }
  ]
})
export class CustomCheckboxComponent implements ControlValueAccessor{

  label = input('');
  checked: boolean = false;

  onChange: any = () => {};

  onTouch: any = () => {};

  writeValue(checked: boolean): void {
    this.checked = checked;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onModelChange(e: boolean) {
    this.checked = e;

    this.onChange(e);
  }

}
