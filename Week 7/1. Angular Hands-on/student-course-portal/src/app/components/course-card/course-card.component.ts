import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgIf } from '@angular/common';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgIf,
    CreditLabelPipe,
    HighlightDirective
  ],
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnChanges {
  // Hands-On 2 & 6: @Input property
  @Input() course!: Course;
  // Hands-On 3 Task 3: Configurable input for highlight directive
  @Input() appHighlightColor: string = 'yellow';

  // Hands-On 2 Task 3: @Output EventEmitter with strongly typed payload
  @Output() enrollRequested = new EventEmitter<number>();

  // Hands-On 3 Task 2: Height toggle property
  isExpanded = false;

  constructor(public enrollmentService: EnrollmentService) {}

  // Hands-On 2 Task 2: Lifecycle hook observing input changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      const prev = changes['course'].previousValue;
      const curr = changes['course'].currentValue;
      console.log('CourseCardComponent ngOnChanges - Previous:', prev, 'Current:', curr);
    }
  }

  // Hands-On 3 Task 2 Step 32: Getter method for clean template binding of ngClass
  // Explanation: Using getters keeps HTML templates clean and readable, delegating complex conditional class calculation to TypeScript logic.
  get cardClasses(): { [key: string]: boolean } {
    return {
      'course-card': true,
      'card--enrolled': this.isEnrolled,
      'card--full': this.course?.credits >= 4,
      'expanded': this.isExpanded
    };
  }

  // Hands-On 3 Task 2 Step 30: Inline style object getter for left border color
  get borderStyle(): { [key: string]: string } {
    const status = this.course?.gradeStatus;
    let color = 'grey';
    if (status === 'passed') color = 'green';
    else if (status === 'failed') color = 'red';
    else if (status === 'pending') color = 'grey';

    return {
      'border-left': `6px solid ${color}`
    };
  }

  get isEnrolled(): boolean {
    return this.course ? this.enrollmentService.isEnrolled(this.course.id) : false;
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  onEnrollClick(): void {
    if (this.course) {
      if (this.isEnrolled) {
        this.enrollmentService.unenroll(this.course.id);
      } else {
        this.enrollmentService.enroll(this.course.id);
      }
      // Emit event up to parent component
      this.enrollRequested.emit(this.course.id);
    }
  }
}
