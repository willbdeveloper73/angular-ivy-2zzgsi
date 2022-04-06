import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Course } from '../../../../shared-types';
import { CourseForm, CourseService } from '../../../../shared';

@Component({
  selector: 'app-course-admin',
  templateUrl: './course-admin.component.html',
})
export class CourseAdminComponent implements OnInit, OnDestroy {
  form: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private courseForm: CourseForm,
    @Inject('COLUMNS') public elements: any,
    private service: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.courseForm.generate();

    this.courseForm.parseRoute(this.route);

    this.courseForm.id$.subscribe((id: number) =>
      id ? this.service.get(id) : this.service.blank()
    );

    this.service.item$
      .pipe(takeUntil(this.destroy$))
      .subscribe((item: Course) =>
        this.form.patchValue(this.courseForm.patch(item))
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  save(form: FormGroup) {
    this.service.save(this.courseForm.values(form));
    this.router.navigate(['/admin/course/list']);
  }
}
