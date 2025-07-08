import { Component, effect, inject, signal } from "@angular/core";
import { NavigationBarComponent } from "../shared/layout/navigation-bar.component";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../shared/layout/footer.component";

@Component({
  selector: 'atp-pages',
  standalone: true,
  imports: [NavigationBarComponent, RouterOutlet, FooterComponent],
  template: `
    <div>
      <atp-navigation-bar/>
    </div>
    <div class="system-container">
      <router-outlet/>
    </div>
    <div>
      <atp-footer/>
    </div>
  `,
  styles: ``
})
export class PagesComponent {
}
