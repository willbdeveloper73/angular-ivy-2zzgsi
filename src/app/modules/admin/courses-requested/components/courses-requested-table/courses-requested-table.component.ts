import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseRequest } from '../../../../shared-types';
import { CourseRequestService } from '../../../../shared';

@Component({
  selector: 'app-courses-requested-table',
  templateUrl: './courses-requested-table.component.html',
})
export class CoursesRequestedTableComponent implements OnInit {
  constructor(
    public service: CourseRequestService,
    @Inject('COLUMNS') public columns: any,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.get();
  }

  add() {
    this.router.navigate(['/support/course-request']);
  }

  edit($event: Partial<CourseRequest>) {
    this.router.navigate(['/admin/courses-requested/edit', $event.id]);
  }

  delete(item: Partial<CourseRequest>) {
    this.service.remove(item);
  }
}
