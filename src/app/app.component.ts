import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PagesComponent } from "./pages/pages.component";

@Component({
  selector: 'atp-root',
  imports: [PagesComponent],
  template: `
    <!-- <a href="https://www.vecteezy.com/free-vector/garage-background">Garage Background Vectors by Vecteezy</a> -->
    <atp-pages/>
  `,
  styles: `

  `
})
export class AppComponent {

}
