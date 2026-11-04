import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  studentName = 'Alex Johnson';
  studentEmail = 'alex.johnson@university.edu';
  enrolledCourses: Course[] = [];

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    // Hands-On 6 Step 66: Fetch enrolled courses from EnrollmentService
    this.enrolledCourses = this.enrollmentService.getEnrolledCourses();
  }

  refreshEnrolled(): void {
    this.enrolledCourses = this.enrollmentService.getEnrolledCourses();
  }
}
