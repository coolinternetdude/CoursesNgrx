import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { loadAllCourses } from "./course.actions";
import { filter, finalize, first, tap } from "rxjs/operators";
import { areCoursesLoaded } from "./courses.selectors";

export const CoursesResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<any> => {
  const store = inject(Store);
  let loading = false;
  return store.pipe(
    select(areCoursesLoaded),
    tap((coursesLoaded) => {
      if (!loading && !coursesLoaded) {
        loading = true;
        store.dispatch(loadAllCourses());
      }
    }),
    filter((coursesLoaded) => coursesLoaded),
    first(),
    finalize(() => (loading = false))
  );
};
