import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Enrollment, Role, User, Watched } from '../../shared-types';
import { CrudService } from './crud.service';
import { CourseService } from './course.service';
import { UserService } from './user.service';
import { EnrollmentService } from './enrollment.service';
import { WatchedService } from './watched.service';
import { rawUsers } from './rawData';

@Injectable({ providedIn: 'root' })
export class AuthenticatedUserService extends CrudService<User> {
  _items: Partial<User>[] = [];

  #tempItem: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  tempItem$: Observable<User> = this.#tempItem.asObservable();

  #userId: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  userId$: Observable<number> = this.#userId.asObservable();

  #autoPlay: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  autoPlay$: Observable<boolean> = this.#autoPlay.asObservable();

  #courseItemsWatched: BehaviorSubject<Partial<Watched>[]> =
    new BehaviorSubject<Partial<Watched>[]>(null);
  courseItemsWatched$: Observable<Partial<Watched>[]> =
    this.#courseItemsWatched.asObservable();

  enrollmentService: EnrollmentService;

  watched: Partial<Watched>[] = [];

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private watchedService: WatchedService
  ) {
    super();
    this.enrollmentService = new EnrollmentService(this, this.courseService);
    this.userService.get();

    // When changing userId, select the appropriate user
    combineLatest([this.userService.items$, this.userId$])
      .pipe(
        map(([items, userId = 0]) => {
          if (this._items !== items) {
            this._items = items;
          }
          const user = this._items.find(
            (item: Partial<User>) => item.id === userId
          );
          this.#autoPlay.next(user?.settings?.autoPlay);
          this.#tempItem.next(user);
        })
      )
      .subscribe();

    // When a new user has been authenticated, grab all enrollments for the user
    combineLatest([
      this.tempItem$,
      this.enrollmentService.items$,
      this.watchedService.items$,
    ])
      .pipe(
        map(([user, enrollments, watched]) => {
          if (!user) return;

          // Enrollments
          const userEnrollments = enrollments?.filter(
            (enroll: Partial<Enrollment>) => enroll.userId === user.id
          );
          if (enrollments && user.enrollments !== userEnrollments) {
            user.enrollments = userEnrollments;
          }

          // Watched
          const userWatched = watched?.filter(
            (record: Partial<Watched>) => record.userId === user.id
          );
          // this.#courseItemsWatched.next(userWatched);
          user.watched = userWatched || [];
          this.item.next(user);
        })
      )
      .subscribe();
  }

  setLessonWatched(courseId: number, itemId: number) {
    this.watched.push({ courseId, itemId });
  }

  get(id: number): void {
    this.enrollmentService.getForUser(id);
    this.#userId.next(id);
  }

  enroll(enrollment: Partial<Enrollment>) {
    this.enrollmentService.save(enrollment);
  }

  unenroll(enrollment: Partial<Enrollment>) {
    this.enrollmentService.remove(enrollment);
  }

  public HasAnyRole(...rolesToCheck: string[]): Promise<boolean> {
    let result: boolean = true;
    this.item$
      .pipe(
        map((user: User) => {
          if (user.roles && user.roles.length > 0) {
            return rolesToCheck.some(
              (role) =>
                user.roles &&
                user.roles.find(
                  (userRole: Partial<Role>) => userRole.name === role
                )
            );
          } else {
            return false;
          }
        })
      )
      .subscribe((checkResult) => {
        result = checkResult;
      });
    return new Promise<boolean>((resolve, reject) => {
      resolve(result);
    });
  }
}
