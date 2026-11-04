import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget.component';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    CourseSummaryWidgetComponent,
    NotificationComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // Hands-On 2 Task 1 Step 11: String interpolation property
  portalName = 'Student Course Portal';

  // Hands-On 2 Task 1 Step 12: Property binding
  isPortalActive = true;

  // Hands-On 2 Task 1 Step 13: Event binding message
  message = '';

  // Hands-On 2 Task 1 Step 14: Two-way binding with ngModel
  searchTerm = '';

  // Stats row hardcoded/live values
  enrolledCount = 3;
  gpa = 3.8;

  constructor(public courseService: CourseService) {}

  // Hands-On 2 Task 2 Step 16: ngOnInit lifecycle hook
  ngOnInit(): void {
    console.log('HomeComponent initialised — courses loaded');
  }

  // Hands-On 2 Task 2 Step 17: ngOnDestroy lifecycle hook
  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  // Hands-On 2 Task 1 Step 13: Event handler
  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }

  get liveCourseCount(): number {
    return this.courseService.getMockCourses().length;
  }
}
