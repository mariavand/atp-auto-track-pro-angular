import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, ElementRef, forwardRef, inject, input, InputSignal, NO_ERRORS_SCHEMA, output, OutputEmitterRef, signal } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'atp-custom-select',
  template: `
    <div class="select">
      <button class="select__btn" (click)="toggleSelect()">
        <span class="select__selected-option">
            {{ selectedLabel() || placeholder() }}
        </span>
      </button>
      @if(isOpen()){
        <ul class="select__dropdown">
          @for(opt of options(); track opt){
            <li class="select__dropdown__option"(click)="selectOption(opt)" role="option">
              {{ opt.label }}
            </li>
          }
        </ul>
      }
    </div>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  styles: [`

  `],
  imports: [FormsModule, ReactiveFormsModule],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ],
  host: {
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class CustomSelectComponent implements ControlValueAccessor{

  options: InputSignal<{ value: string | number, label: string }[]> = input.required();
  placeholder = input('Select an option');
  selectionChange: OutputEmitterRef<any> = output();

  el = inject(ElementRef);

  isOpen = signal(false);
  selectedValue = signal<any>(null);
  selectedLabel = computed(() => {
    const currentVal = this.selectedValue();
    const selected = this.options().find(o => o.value === currentVal);
    return selected ? selected.label : '';
  });

  isDisabled = signal(false);
  highlightedIndex = signal(-1);

  constructor(){
    effect(() => {
      const initialIndex = this.options().findIndex(o => o.value === this.selectedValue());
      if (initialIndex !== -1) {
        this.highlightedIndex.set(initialIndex);
      }
    })
  }

  onChange: any = () => {};

  onTouch: any = () => {};

  writeValue(selectedValue: string | number): void {
    this.selectedValue.set(selectedValue);
    const index = this.options().findIndex(o => o.value === selectedValue);
    this.highlightedIndex.set(index);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  toggleSelect(){
    if (this.isDisabled()) {
      return;
    }
    this.isOpen.update(current => !current);
    if (this.isOpen()) {
      // When opening, ensure highlightedIndex matches selected or is 0
      if (this.selectedValue() === null && this.options().length > 0) {
        this.highlightedIndex.set(0);
      } else {
        const currentIndex = this.options().findIndex(o => o.value === this.selectedValue());
        this.highlightedIndex.set(currentIndex !== -1 ? currentIndex : 0);
      }
    } else {
      this.onTouch(); // Mark as touched when closing
    }
  }

  selectOption(option: { value: string | number, label: string }){
    if (this.isDisabled()) {
      return;
    }
    this.selectedValue.set(option.value);
    this.onChange(option.value); // Notify Reactive Forms
    this.selectionChange.emit(option.value); // Emit custom event
    this.isOpen.set(false);
    this.onTouch(); // Mark as touched
  }

  onDocumentClick(event: MouseEvent){
    console.log(this.el.nativeElement.contains(event.target));
    console.log(this.el.nativeElement);
    console.log(event.target);
    if (!this.el.nativeElement.contains(event.target) && this.isOpen()) {
      this.isOpen.set(false);
      this.onTouch(); // Mark as touched when clicking outside
    }
  }

}
