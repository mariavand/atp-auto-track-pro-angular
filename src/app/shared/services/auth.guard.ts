import { inject } from "@angular/core";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { map } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let isAuthenticated = toSignal(authService.isAuthenticated$.pipe(
    takeUntilDestroyed(),
    map((u) => {
      console.log('in authGuard', u);
      return u;
    })
  ));

  if(isAuthenticated()){
    console.log('Authenticated');
    return true;
  }
  else{
    router.navigate(['']);
    return false;
  }
}
