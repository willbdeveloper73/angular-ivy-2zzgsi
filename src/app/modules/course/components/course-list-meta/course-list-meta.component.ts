import { Component } from '@angular/core';

import { CourseService } from '../../../shared';

@Component({
  selector: 'app-course-list-meta',
  templateUrl: './course-list-meta.component.html',
})
export class CourseListMetaComponent {
  constructor(public courseService: CourseService) {}
}
