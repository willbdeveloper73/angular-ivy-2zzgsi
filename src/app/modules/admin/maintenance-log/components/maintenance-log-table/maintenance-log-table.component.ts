import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaintenanceLog } from '../../../../shared-types';
import { MaintenanceLogService } from '../../../../shared';

@Component({
  selector: 'app-maintenance-log-table',
  templateUrl: './maintenance-log-table.component.html',
})
export class MaintenanceLogTableComponent implements OnInit {
  constructor(
    public service: MaintenanceLogService,
    @Inject('COLUMNS') public columns: any,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.get();
  }

  add() {
    this.router.navigate(['/support/help']);
  }

  edit($event: Partial<MaintenanceLog>) {
    this.router.navigate(['/admin/maintenance-log/edit', $event.id]);
  }

  delete(item: Partial<MaintenanceLog>) {
    this.service.remove(item);
  }
}
