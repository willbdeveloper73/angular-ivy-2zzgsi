import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { User, UserElements } from '../../../../shared-types';
import { CrudService, UserService, UserForm } from '../../../../shared';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
})
export class UserAdminComponent implements OnInit, OnDestroy {
  form: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private userForm: UserForm,
    @Inject('COLUMNS') public elements: any,
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.userForm.generate();

    this.userForm.parseRoute(this.route);

    this.userForm.id$
      .pipe(takeUntil(this.destroy$))
      .subscribe((id: number) =>
        id ? this.service.get(id) : this.service.blank()
      );

    this.service.item$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: Partial<User>) =>
        this.form.patchValue(this.userForm.patch(user))
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  save(form: FormGroup) {
    this.service.save(this.userForm.values(form));
    this.router.navigate(['/admin/user/list']);
  }
}
