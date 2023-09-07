import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { inject } from "@angular/core";
import { AuthState } from "./auth.reducer";
import { isLoggenIn } from "./auth.selectors";
import { tap } from "rxjs/operators";

export const authGuardFn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const store = inject(Store<AuthState>);
  const router = inject(Router);
  return store.pipe(
    select(isLoggenIn),
    tap((loggedIn) => {
      if (!loggedIn) router.navigateByUrl("");
    })
  );
};
