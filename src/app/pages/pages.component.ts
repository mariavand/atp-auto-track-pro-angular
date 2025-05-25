import { Component } from "@angular/core";
import { NavigationBarComponent } from "../shared/layout/navigation-bar.component";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../shared/layout/footer.component";

@Component({
  selector: 'atp-pages',
  standalone: true,
  imports: [NavigationBarComponent, RouterOutlet, FooterComponent],
  template: `
    <atp-navigation-bar/>
    <div>
      <router-outlet/>
    </div>
    <atp-footer/>
  `,
  styles: ``
})
export class PagesComponent {

}
