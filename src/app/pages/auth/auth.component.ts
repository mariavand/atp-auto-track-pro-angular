import { Component, inject, Signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
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
  router = inject(Router);

  user: Signal<User | null | undefined> = toSignal(this.authService.user$.pipe(
    takeUntilDestroyed(),
    map((u) => {
      console.log('in map', u);
      if(!!u){
        this.router.navigate(['/system']);
      }
      return u;
    })
  ));
}
