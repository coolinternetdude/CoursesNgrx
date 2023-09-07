import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CourseState } from "./course.reducer";
import * as fromCourses from "./course.reducer";

export const selectCoursesState = createFeatureSelector<CourseState>("courses");

export const selectAllCourses = createSelector(selectCoursesState, (state) =>
  fromCourses.selectAll(state)
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.category == "BEGINNER")
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.category == "ADVANCED")
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.promo).length
);

export const areCoursesLoaded = createSelector(
  selectCoursesState,
  (state) => state.allCoursesLoaded
);
