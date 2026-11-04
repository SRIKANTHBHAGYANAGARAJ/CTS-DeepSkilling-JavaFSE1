import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.css']
})
export class EnrollmentFormComponent {
  // Model properties for template-driven form
  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = 'Odd';
  agreeToTerms = false;

  submitted = false;

  semesterOptions = ['Odd', 'Even'];

  // Hands-On 4 Task 1 Step 40: onSubmit method logging form value and validity
  onSubmit(form: NgForm): void {
    console.log('Template-Driven Form Submitted!');
    console.log('Form Value:', form.value);
    console.log('Form Validity:', form.valid);

    if (form.valid) {
      this.submitted = true;
    }
  }

  // Hands-On 4 Task 2 Step 47: Reset form method
  onReset(form: NgForm): void {
    form.resetForm({
      preferredSemester: 'Odd',
      agreeToTerms: false
    });
    this.submitted = false;
  }
}
