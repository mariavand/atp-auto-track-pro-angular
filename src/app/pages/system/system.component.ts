import { Component } from "@angular/core";
import { CarsTableComponent } from "./cars-table.component";

@Component({
  selector: 'atp-system',
  standalone: true,
  imports: [CarsTableComponent],
  template: `

    <atp-cars-table/>

  `,
  styles: ``
})
export class SystemComponent {
}
