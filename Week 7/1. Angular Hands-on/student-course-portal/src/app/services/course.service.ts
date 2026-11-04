import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry, tap, switchMap } from 'rxjs/operators';
import { Course, Student } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  private mockCourses: Course[] = [
    { id: 1, name: 'Data Structures & Algorithms', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Database Management Systems', code: 'CS102', credits: 3, gradeStatus: 'passed' },
    { id: 3, name: 'Web Development with Angular', code: 'CS201', credits: 4, gradeStatus: 'pending' },
    { id: 4, name: 'Operating Systems', code: 'CS202', credits: 3, gradeStatus: 'failed' },
    { id: 5, name: 'Software Engineering & Agile', code: 'CS301', credits: 2, gradeStatus: 'pending' }
  ];

  constructor(private http: HttpClient) {}

  // Synchronous getter for local/mock fallback
  getMockCourses(): Course[] {
    return [...this.mockCourses];
  }

  // Hands-On 8: HTTP Client GET with map, tap, retry, and catchError
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      // RxJS map operator: Filter active courses with credits > 0
      map(courses => courses.filter(c => c.credits > 0)),
      // RxJS tap operator: Side effect logging (without mutating stream data)
      // Note: tap is preferred over map for side effects because map should remain a pure transformation function.
      tap(courses => console.log('Courses loaded via HTTP:', courses.length)),
      // Hands-On 8 Task 2: Retry failed request up to 2 times before propagating error
      retry(2),
      // Hands-On 8 Task 2: Catch HTTP errors gracefully
      catchError(err => {
        console.error('CourseService HTTP Error:', err);
        // Fallback to local mock array if JSON Server is offline
        return of(this.mockCourses);
      })
    );
  }

  getCourseById(id: number): Observable<Course | undefined> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      retry(1),
      catchError(() => {
        const found = this.mockCourses.find(c => c.id === Number(id));
        return of(found);
      })
    );
  }

  addCourse(course: Course): void {
    this.mockCourses.push(course);
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      tap(newCourse => this.mockCourses.push(newCourse)),
      catchError(err => {
        console.error('Error creating course:', err);
        const created: Course = { ...course, id: Date.now() };
        this.mockCourses.push(created);
        return of(created);
      })
    );
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course).pipe(
      catchError(err => throwError(() => new Error('Failed to update course. Please try again.')))
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.mockCourses = this.mockCourses.filter(c => c.id !== id);
      }),
      catchError(err => throwError(() => new Error('Failed to delete course.')))
    );
  }

  // Hands-On 8 Task 2: switchMap demonstration - fetching students enrolled in a selected course
  // Note: switchMap cancels any previous pending inner HTTP request if a new courseId is selected before completion.
  getStudentsByCourse(courseId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`http://localhost:3000/students?courseIds_like=${courseId}`).pipe(
      catchError(() => of([]))
    );
  }
}
