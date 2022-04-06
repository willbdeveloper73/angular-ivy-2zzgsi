import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Role } from '../../../../shared-types';
import { RoleService, RoleForm } from '../../../../shared';

@Component({
  selector: 'app-role-admin',
  templateUrl: './role-admin.component.html',
})
export class RoleAdminComponent implements OnInit, OnDestroy {
  form: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private roleForm: RoleForm,
    @Inject('COLUMNS') public elements: any,
    public service: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.roleForm.generate();

    this.roleForm.parseRoute(this.route);

    this.roleForm.id$
      .pipe(takeUntil(this.destroy$))
      .subscribe((id: number) =>
        id ? this.service.get(id) : this.service.blank()
      );

    this.service.item$
      .pipe(takeUntil(this.destroy$))
      .subscribe((item: Role) =>
        this.form.patchValue(this.roleForm.patch(item))
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  save(form: FormGroup) {
    this.service.save(this.roleForm.values(form));
    this.router.navigate(['/admin/role/list']);
  }
}
