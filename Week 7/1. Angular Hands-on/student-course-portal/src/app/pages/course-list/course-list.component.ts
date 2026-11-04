import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Course } from '../../models/course.model';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { CourseService } from '../../services/course.service';
import * as CourseActions from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, FormsModule, CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  // Hands-On 3 Task 1 Step 25: Loading flag
  isLoading = true;

  // Hands-On 2 Task 3 Step 23: Selected course ID
  selectedCourseId: number | null = null;

  // Hands-On 7 Step 71: Query param search term
  searchTerm = '';

  courses$: Observable<Course[]> = of([]);

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    // Hands-On 9 Step 96: Dispatch NgRx action and select courses from store
    this.store.dispatch(CourseActions.loadCourses());
    this.courses$ = this.store.select(selectAllCourses);

    // Hands-On 7 Step 71: Read query parameter
    const querySearch = this.route.snapshot.queryParamMap.get('search');
    if (querySearch) {
      this.searchTerm = querySearch;
    }

    // Hands-On 3 Step 25: Simulate 1.5s initial loading time
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  // Hands-On 3 Task 1 Step 26: trackBy function for performance optimization
  // Explanation: trackBy prevents re-rendering all DOM elements when the array mutates.
  // Angular updates only DOM elements whose trackBy identifier has changed.
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  // Hands-On 2 Task 3 Step 23: Parent component event handler
  onEnroll(courseId: number): void {
    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;
  }

  // Hands-On 7 Step 70: Navigate to course details
  viewCourseDetails(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  // Hands-On 7 Step 71: Update URL query params on search
  onSearchChange(): void {
    this.router.navigate(['/courses'], {
      queryParams: { search: this.searchTerm || null }
    });
  }
}
