import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { CourseCardComponent } from './course-card.component';
import { Course } from '../../models/course.model';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures & Algorithms',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
  });

  // Step 102: Verifies component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Step 103: Tests @Input rendering in DOM
  it('should render course title passed via @Input', () => {
    component.course = {
      id: 1,
      name: 'Data Structures & Algorithms',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed'
    };
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(titleElement.textContent).toContain('Data Structures & Algorithms');
  });

  // Step 104: Tests @Output event emission
  it('should emit enrollRequested event when Enroll button is clicked', () => {
    spyOn(component.enrollRequested, 'emit');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;

    button.click();
    fixture.detectChanges();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  // Step 105: Tests ngOnChanges lifecycle hook
  it('should execute ngOnChanges when input changes', () => {
    spyOn(console, 'log');

    component.ngOnChanges({
      course: new SimpleChange(null, mockCourse, true)
    });

    expect(console.log).toHaveBeenCalledWith(
      'CourseCardComponent ngOnChanges - Previous:',
      null,
      'Current:',
      mockCourse
    );
  });
});
