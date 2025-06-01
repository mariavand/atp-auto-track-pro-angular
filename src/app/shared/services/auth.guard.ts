import { inject } from "@angular/core";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { first, map, Observable } from "rxjs";

export const authGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> | boolean=> {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    first(),
    map(isAuthenticated => {
      if(isAuthenticated){
        return router.createUrlTree(['/system']);
      }
      else{
        return false;
      }
    })
  )

}
