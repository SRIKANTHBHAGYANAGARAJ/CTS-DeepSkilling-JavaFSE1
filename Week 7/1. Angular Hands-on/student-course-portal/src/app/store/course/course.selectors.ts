import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';

export const selectCourseState = createFeatureSelector<CourseState>('course');

// Selectors are memoized - they only recompute when their input selectors change.
export const selectAllCourses = createSelector(
  selectCourseState,
  (state: CourseState) => state?.courses || []
);

export const selectCoursesLoading = createSelector(
  selectCourseState,
  (state: CourseState) => state?.loading || false
);

export const selectCoursesError = createSelector(
  selectCourseState,
  (state: CourseState) => state?.error || null
);
