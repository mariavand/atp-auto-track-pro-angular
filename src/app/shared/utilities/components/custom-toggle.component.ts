import { Component, CUSTOM_ELEMENTS_SCHEMA, forwardRef, input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'atp-custom-toggle',
  template: `

    <input type="checkbox" id="{{name()}}" [ngModel]="checked" (ngModelChange)="onModelChange($event)" />

  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [FormsModule, ReactiveFormsModule],
  styles: [`
    input[type="checkbox"]
      border: 1px solid #008080;
      border-radius: 5px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 1rem
      // position: absolute;
      // margin: auto;
      // left: 0;
      // right: 0;
      // top: 0;
      // bottom: 0;
      cursor: pointer;
      outline: none;
      height: 3.5rem;
      width: 8rem;
      background: linear-gradient(135deg, #F3F3F3, #575E65);
      -webkit-transform: skewX(-15deg);
      -ms-transform: skewX(-15deg);
      transform: skewX(-15deg);
      -webkit-transition: 0.3s;
      -o-transition: 0.3s;
      transition: 0.3s;

    input[type="checkbox"]:before
      font-size: 1.2rem;
      content: "OFF";
      position: absolute;
      width: 3.3rem;
      height: 2.5rem;
      background: linear-gradient(135deg, rgba(#303841, .7), rgba(#575E65, .5));
      color: #F3F3F3;
      top: 0.42em;
      left: 0.42em;
      -webkit-transition: 0.3s;
      -o-transition: 0.3s;
      transition: 0.3s;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      font-family: "Poppins", sans-serif;
      font-weight: 600;
      letter-spacing: 1px;

    input[type="checkbox"]:checked
      background: linear-gradient(135deg, #F3F3F3, #008080);

    input[type="checkbox"]:checked:before
      content: "ON";
      left: 3.5em;
      color: #02aaaaff;

  `],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomToggleComponent),
      multi: true
    }
  ]
})
export class CustomToggleComponent implements ControlValueAccessor{

  name = input('');
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
