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
  styles: [`
    .checkbox-wrapper-57 input[type="checkbox"]
      visibility: hidden;
      display: none;

    .checkbox-wrapper-57 *,
    .checkbox-wrapper-57 ::after,
    .checkbox-wrapper-57 ::before
      box-sizing: border-box;

    .checkbox-wrapper-57 .checkbox-container
      display: flex;
      gap: 1.2rem;
      color: #F3F3F3;
      position: relative;
      cursor: pointer;
      font-size: 1.2rem;
      user-select: none;

    /* Create a custom checkbox */
    .checkbox-wrapper-57 .checkmark
      position: relative;
      top: 0;
      left: 0;
      height: 1.3em;
      width: 1.3em;
      background: #F3F3F3;
      border-radius: 50px;
      transition: all 0.7s;
      --spread: 1rem;

    .checkbox-wrapper-57 .checkbox-container input:checked ~ .checkmark
      background: #F3F3F3;
      box-shadow: -5px -5px var(--spread) 0px #5B51D8, 0 -5px var(--spread) 0px #833AB4, 5px -5px var(--spread) 0px #E1306C, 5px 0 var(--spread) 0px #FD1D1D, 5px 5px var(--spread) 0px #F77737, 0 5px var(--spread) 0px #FCAF45, -5px 5px var(--spread) 0px #FFDC80;

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkbox-wrapper-57 .checkmark::after
      content: "";
      position: absolute;
      display: none;

    /* Show the checkmark when checked */
    .checkbox-wrapper-57 .checkbox-container input:checked ~ .checkmark::after
      display: block;

    /* Style the checkmark/indicator */
    .checkbox-wrapper-57 .checkbox-container .checkmark::after
      left: 0.5em;
      top: 0.34em;
      width: 0.25em;
      height: 0.5em;
      border: solid #303841;
      border-width: 0 0.15em 0.15em 0;
      transform: rotate(45deg);

    .checkbox-wrapper-57
      padding: 1rem 1.5rem;
  `],
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
