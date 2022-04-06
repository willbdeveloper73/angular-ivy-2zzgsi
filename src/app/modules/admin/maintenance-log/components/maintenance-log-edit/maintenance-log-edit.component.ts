import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MaintenanceLog } from '../../../../shared-types';
import { MaintenanceLogForm, MaintenanceLogService } from '../../../../shared';

@Component({
  selector: 'app-maintenance-log-edit',
  templateUrl: './maintenance-log-edit.component.html',
})
export class MaintenanceLogEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private maintenanceLogForm: MaintenanceLogForm,
    @Inject('COLUMNS') public elements: any,
    public service: MaintenanceLogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.maintenanceLogForm.generate();

    this.maintenanceLogForm.parseRoute(this.route);

    this.maintenanceLogForm.id$
      .pipe(takeUntil(this.destroy$))
      .subscribe((id: number) =>
        id ? this.service.get(id) : this.service.blank()
      );

    this.service.item$
      .pipe(takeUntil(this.destroy$))
      .subscribe((item: MaintenanceLog) =>
        this.form.patchValue(this.maintenanceLogForm.patch(item))
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  save(form: FormGroup) {
    this.service.save(this.maintenanceLogForm.values(form));
    this.router.navigate(['/admin/maintenance-log/list']);
  }
}
