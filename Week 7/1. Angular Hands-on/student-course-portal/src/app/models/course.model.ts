export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  gradeStatus: 'passed' | 'failed' | 'pending';
}

export interface Student {
  id: number;
  name: string;
  email: string;
  courseIds: number[];
}

export interface EnrollmentRequest {
  id?: number;
  courseId: number;
  studentName: string;
  studentEmail: string;
  preferredSemester: 'Odd' | 'Even';
}
