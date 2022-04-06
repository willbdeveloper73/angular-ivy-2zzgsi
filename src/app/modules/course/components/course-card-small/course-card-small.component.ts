import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subject,
  takeUntil,
  combineLatest,
} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Course, Enrollment, User } from '../../../shared-types';
import { AuthenticatedUserService } from '../../../shared';

@Component({
  selector: 'app-course-card-small',
  templateUrl: './course-card-small.component.html',
  styleUrls: ['./course-card-small.component.scss'],
})
export class CourseCardSmallComponent implements OnInit, OnDestroy {
  @Input() course: Partial<Course> = {};
  maxRating: number = 5;

  destroy$: Subject<boolean> = new Subject<boolean>();

  #currentEnrollment: BehaviorSubject<Partial<Enrollment>> =
    new BehaviorSubject<Partial<Enrollment>>(null);
  currentEnrollment$: Observable<Partial<Enrollment>> =
    this.#currentEnrollment.asObservable();

  constructor(
    public user: AuthenticatedUserService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.user.item$
      .pipe(
        map((user: Partial<User>) => {
          let current: Partial<Enrollment> = user.enrollments.find(
            (enrollment) => enrollment.courseId === this.course.id
          );

          current = {
            ...(current
              ? current
              : {
                  courseId: this.course.id,
                  userId: user.id,
                }),
            currentlyEnrolled: current ? true : false,
          };
          this.#currentEnrollment.next(current);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  // TODO: Need to add a check to see if the user is enrolled in the course.
  launchCourse(currentEnrollment: Partial<Enrollment>) {
    this.router.navigate(['/course/launch', currentEnrollment.courseId]);
  }

  unAssignCourse(enrollment: Partial<Enrollment>) {
    this.user.unenroll(enrollment);
  }

  assignCourse(enrollment: Partial<Enrollment>) {
    this.user.enroll(enrollment);
  }
}
