import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { ComponentCanDeactivate } from '../../guards/unsaved-changes.guard';

// Hands-On 5 Task 2 Step 53: Custom synchronous validator function
export function noCourseCodeValidator(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value || '');
  if (value.startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

// Hands-On 5 Task 2 Step 55: Custom async validator function simulating API call
export function simulateEmailCheckValidator(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      const email = String(control.value || '');
      if (email.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './reactive-enrollment.component.html',
  styleUrls: ['./reactive-enrollment.component.css']
})
export class ReactiveEnrollmentFormComponent implements OnInit, ComponentCanDeactivate {
  enrollForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Hands-On 5 Task 1 Step 49: Build reactive form structure with FormBuilder
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: [
        '',
        [Validators.required, Validators.email],
        [simulateEmailCheckValidator] // Async validator passed as 3rd argument
      ],
      courseId: [null, [Validators.required, noCourseCodeValidator]], // Custom sync validator applied
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([]) // FormArray for dynamic controls
    });
  }

  // Hands-On 5 Task 2 Step 57: Typed getter for FormArray
  // Explanation: Using a typed getter provides strong TypeScript autocomplete, compile-time safety,
  // and avoids cluttering template code with expensive inline type casts like (enrollForm.get('additionalCourses') as FormArray).
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  // Hands-On 5 Task 2 Step 56: Add dynamic course control
  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  // Hands-On 5 Task 2 Step 56: Remove dynamic course control
  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  // Hands-On 5 Task 1 Step 51: Form submission handler
  onSubmit(): void {
    if (this.enrollForm.valid) {
      console.log('Reactive Form Submitted!');
      // Hands-On 5 Task 1 Step 51 & 52: Log value and getRawValue()
      console.log('enrollForm.value:', this.enrollForm.value);
      console.log('enrollForm.getRawValue():', this.enrollForm.getRawValue());
      this.submitted = true;
      this.enrollForm.markAsPristine();
    }
  }

  // Hands-On 7 Step 77: Guard interface implementation
  canDeactivate(): boolean {
    return !this.enrollForm.dirty;
  }
}
