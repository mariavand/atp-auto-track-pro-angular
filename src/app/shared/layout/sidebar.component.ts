import { Component, EventEmitter, input, InputSignal, model, ModelSignal, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'atp-sidebar',
  imports: [],
  template: `
  @if(isSidebarOpen()){
    <div class="sidebar sidebar__wrapper">
      <div class="sidebar__container">

      </div>
    </div>
  }
  `,
  styles: [``]
})
export class SidebarComponent {

  // isSidebarOpen: ModelSignal<boolean> = model.required();

  isSidebarOpen = input();
  isSidebarOpenChange: OutputEmitterRef<boolean> = output();

  constructor(){
    console.log('test', this.isSidebarOpen())
  }

  onCloseSidebar(){
    this.isSidebarOpenChange.emit(false);
  }

}
