import { Component, inject, Signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { first, map } from 'rxjs';

@Component({
  selector: 'atp-root',
  imports: [RouterOutlet],
  template: `
    <button (click)="auth.loginWithRedirect()">Log in</button>
    <router-outlet />
  `,
  styles: `

  `
})
export class AppComponent {
  auth = inject(AuthService);

  user: Signal<User | null | undefined> = toSignal(this.auth.user$.pipe(
    takeUntilDestroyed(),
    map((u) => {
      console.log('in map', u);
      return u;
    })
  ));

  constructor(){
    console.log('user', this.user);
  }
}
