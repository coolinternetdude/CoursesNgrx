import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Course, compareCourses } from "./model/course";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "./action-types";

export interface CourseState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

const adapter = createEntityAdapter<Course>({ sortComparer: compareCourses });

export const initialCourseState = adapter.getInitialState({
  allCoursesLoaded: false,
});

export const courseReducer = createReducer(
  initialCourseState,
  on(CourseActions.allCoursesLoaded, (state, action) =>
    adapter.setAll(action.courses, { ...state, allCoursesLoaded: true })
  ),
  on(CourseActions.courseUpdated, (state, action) =>
    adapter.updateOne(action.update, state)
  )
);

export const { selectAll } = adapter.getSelectors();
