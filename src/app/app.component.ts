import { Component, inject, Signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { first, map } from 'rxjs';

@Component({
  selector: 'atp-root',
  imports: [RouterOutlet],
  template: `
    <!-- <a href="https://www.vecteezy.com/free-vector/garage-background">Garage Background Vectors by Vecteezy</a> -->
    <router-outlet />
  `,
  styles: `

  `
})
export class AppComponent {
  
}
