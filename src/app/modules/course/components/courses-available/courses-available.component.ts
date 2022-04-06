import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../shared';

@Component({
  selector: 'app-courses-available',
  templateUrl: './courses-available.component.html',
})
export class CoursesAvailableComponent implements OnInit {
  constructor(public service: CourseService) {}

  ngOnInit() {
    this.service.get();
  }
}
