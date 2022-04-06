import { Injectable } from '@angular/core';
import { rawEnrollments, getRawCourse } from './rawData';
import { Enrollment } from '../../shared-types';
import { CrudService } from './crud.service';
import { AuthenticatedUserService } from './authenticated-user.service';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService extends CrudService<Enrollment> {
  _items: Partial<Enrollment>[] = rawEnrollments;
  myUserId: number;
  #rawEnrollments: Partial<Enrollment>[] = rawEnrollments;

  constructor(
    public user: AuthenticatedUserService,
    public course: CourseService
  ) {
    super();
  }

  getForUser(id: number): void {
    this.items.next(
      this._items.filter((enrollment) => enrollment.userId === id)
    );
  }

  public override save(enrollment: Partial<Enrollment>): void {
    const newEnrollment: Partial<Enrollment> = {
      ...enrollment,
      id: this.getNextId(),
      course: this.course.findCourse(enrollment.courseId),
    };
    this._items.push(newEnrollment);
    this.items.next(this._items);
    if (enrollment.userId === this.myUserId) {
      this.getForUser(enrollment.userId);
    }
  }

  public override remove(enrollment: Partial<Enrollment>): void {
    this._items = this._items.filter(
      (original) => original.id !== enrollment.id
    );
    this.items.next(this._items);
    this.getForUser(enrollment.userId);
  }
}
