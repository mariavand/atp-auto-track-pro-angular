import { Component, inject, Signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { AuthService, User } from '@auth0/auth0-angular';
import { map } from 'rxjs';

@Component({
  selector: 'atp-initial',
  imports: [],
  template: `
    <button (click)="auth.loginWithRedirect()">Log in</button>
  `,
  styles: ``
})
export class InitialComponent {

  auth = inject(AuthService);

  user: Signal<User | null | undefined> = toSignal(this.auth.user$.pipe(
    takeUntilDestroyed(),
    map((u) => {
      console.log('in map', u);
      return u;
    })
  ));

  test = toSignal(this.auth.appState$.pipe(
    takeUntilDestroyed(),
    map((u) => {
      console.log('in map, test', u);
      return u;
    })
  ));

  test2 = toSignal(this.auth.idTokenClaims$.pipe(
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
