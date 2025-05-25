import { Component, inject, Signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { AuthService, User } from '@auth0/auth0-angular';
import { map } from 'rxjs';

@Component({
  selector: 'atp-auth',
  imports: [],
  template: `
    <button (click)="authService.loginWithRedirect()">Log in</button>
  `,
  styles: ``
})
export class AuthComponent {

  authService = inject(AuthService);

  user: Signal<User | null | undefined> = toSignal(this.authService.user$.pipe(
    takeUntilDestroyed(),
    map((u) => {
      console.log('in map', u);
      return u;
    })
  ));

  test = toSignal(this.authService.appState$.pipe(
    takeUntilDestroyed(),
    map((u) => {
      console.log('in map, test', u);
      return u;
    })
  ));

  test2 = toSignal(this.authService.idTokenClaims$.pipe(
    takeUntilDestroyed(),
    map((u) => {
      console.log('in map, test', u);
      return u;
    })
  ));

  constructor(){
    console.log('user', this.user());
    console.log('test', this.test());
  }

}
