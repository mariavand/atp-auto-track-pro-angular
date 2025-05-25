import { Component, inject, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { AuthService, User } from "@auth0/auth0-angular";
import { first, map } from "rxjs";

@Component({
  selector: 'atp-navigation-bar',
  standalone: true,
  imports: [],
  template: `
    <div class="navigation">
      <div class="navigation__container">
        <div class="navigation__logo-box">
          <img src="../../assets/images/logo_transparent.png" alt="Logo" class="navigation__logo">
        </div>
        <nav class="navigation__nav">
            <ul class="navigation__list">
                <li class="navigation__item"><button class="navigation__btn">Get In!</button></li>
                <li class="navigation__item">Welcome, <button class="navigation__btn">{{ user()?.name }} </button></li>
            </ul>
        </nav>
      </div>
    </div>
  `,
  styles: ``
})
export class NavigationBarComponent {

  authService = inject(AuthService);

  user: Signal<User | null | undefined> = toSignal(this.authService.user$.pipe(
    first(),
  ));

}
