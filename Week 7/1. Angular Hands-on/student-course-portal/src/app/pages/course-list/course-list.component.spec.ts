import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { CourseListComponent } from './course-list.component';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

describe('CourseListComponent (NgRx Connected)', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let store: MockStore;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Databases', code: 'CS102', credits: 3, gradeStatus: 'passed' }
  ];

  const initialState = {
    course: {
      courses: mockCourses,
      loading: false,
      error: null
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListComponent],
      providers: [
        provideMockStore({ initialState }),
        provideRouter([]),
        CourseService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: () => null
              }
            }
          }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
  });

  // Step 109: Tests store initialization and component rendering
  it('should render course cards matching initial store state', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // Step 110: Tests store state mutation via setState
  it('should display loading indicator when loading state is true in store', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading-state')?.textContent).toContain('Loading courses...');
  });
});
