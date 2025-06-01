import { Component, effect, inject, signal } from "@angular/core";
import { NavigationBarComponent } from "../shared/layout/navigation-bar.component";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../shared/layout/footer.component";
import { CarsService } from "../shared/services/cars.service";

@Component({
  selector: 'atp-pages',
  standalone: true,
  imports: [NavigationBarComponent, RouterOutlet, FooterComponent],
  template: `
    <atp-navigation-bar/>
    <div class="system-container">
      <router-outlet/>
    </div>
    <atp-footer/>
  `,
  styles: ``
})
export class PagesComponent {
}
