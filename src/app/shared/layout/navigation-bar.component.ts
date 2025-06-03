import { Component, inject, Signal } from "@angular/core";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
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
           <div class="navigation__logo-image"></div>
        </div>
        <nav class="navigation__nav">
            <ul class="navigation__list">
              @if(!isAuthenticated()){
                <li class="navigation__item"><button class="navigation__btn" (click)="this.authService.loginWithRedirect()">Get In!</button></li>
              }
              @else {
                <li class="navigation__item">Welcome, <button class="navigation__btn">{{ user()?.name }} </button></li>
                <li class="navigation__item"><button class="navigation__btn">My Profile</button></li>
                <li class="navigation__item"><button class="navigation__btn">Logout</button></li>
              }
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

  isAuthenticated = toSignal(this.authService.isAuthenticated$.pipe(
    takeUntilDestroyed(),
  ));

}
