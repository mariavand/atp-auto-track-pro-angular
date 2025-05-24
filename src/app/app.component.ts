import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'atp-root',
  imports: [RouterOutlet],
  template: `
    <!-- <a href="https://www.vecteezy.com/free-vector/garage-background">Garage Background Vectors by Vecteezy</a> -->
    <router-outlet />
  `,
  styles: `

  `
})
export class AppComponent {

}
