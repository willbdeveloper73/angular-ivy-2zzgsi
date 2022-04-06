import { Component } from '@angular/core';
import { Enrollment } from '../../../shared-types';
import { AuthenticatedUserService} from '../../../shared';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
})
export class UserInfoComponent {
  constructor(public service: AuthenticatedUserService) {}

  completed(enrollments: Partial<Enrollment>[]): number {
    return enrollments.filter((enrollment) => enrollment.dateCompleted).length;
  }
  assigned(enrollments: Partial<Enrollment>[]): number {
    return enrollments.filter((enrollment) => enrollment.dateCompleted).length;
  }
  in_progress(enrollments: Partial<Enrollment>[]): number {
    return enrollments.filter((enrollment) => !enrollment.dateCompleted).length;
  }
}
