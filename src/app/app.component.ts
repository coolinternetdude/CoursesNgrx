import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { AuthState } from "./auth/auth.reducer";
import { User } from "./auth/model/user.model";
import { isLoggedOut, isLoggenIn } from "./auth/auth.selectors";
import { AuthActions } from "./auth/actions-type";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loading = true;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private router: Router, private store: Store<AuthState>) {}

  ngOnInit() {
    const currentUser: User = JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      this.store.dispatch(AuthActions.login({ user: currentUser }));
    }
    this.isLoggedIn$ = this.store.pipe(select(isLoggenIn));
    this.isLoggedOut$ = this.store.select(isLoggedOut);
    // this.isLoggedIn$ = this.store.pipe(map((state) => !!state["auth"].user));
    // this.isLoggedOut$ = this.store.pipe(map((state) => !state["auth"].user));
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigateByUrl("/");
  }
}
