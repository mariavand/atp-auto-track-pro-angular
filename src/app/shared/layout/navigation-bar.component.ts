import { Component, inject, output, signal, Signal } from "@angular/core";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { AuthService, User } from "@auth0/auth0-angular";
import { first, map } from "rxjs";
import { SidebarComponent } from "./sidebar.component";

@Component({
  selector: 'atp-navigation-bar',
  standalone: true,
  imports: [SidebarComponent],
  template: `
    <div class="navigation">
      <div class="navigation__container">
        <div class="navigation__logo-box">
           <button class="navigation__logo-image" (click)="openSidebar()"></button>
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

    <div>
      <atp-sidebar [(isSidebarOpen)]="isSidebarOpen"/>
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

  isSidebarOpen = signal(false);

  openSidebar(){
    this.isSidebarOpen.update(currentStatus => !currentStatus);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }
}
