import { Component, OnInit } from '@angular/core';
import { CourseCategoryService } from '../../../shared';

@Component({
  selector: 'app-courses-available',
  templateUrl: './courses-available.component.html',
})
export class CoursesAvailableComponent implements OnInit {
  constructor(public service: CourseCategoryService) {}

  ngOnInit() {
    this.service.get();
  }
}
