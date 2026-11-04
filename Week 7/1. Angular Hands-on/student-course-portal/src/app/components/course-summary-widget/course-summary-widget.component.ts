import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  template: `
    <div class="summary-widget">
      <h4>Course Summary Widget</h4>
      <p>Shared Singleton Service Total Courses: <strong>{{ courseService.getMockCourses().length }}</strong></p>
    </div>
  `,
  styles: [`
    .summary-widget {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 6px;
      padding: 12px;
      margin-top: 15px;
    }
  `]
})
export class CourseSummaryWidgetComponent {
  constructor(public courseService: CourseService) {}
}
