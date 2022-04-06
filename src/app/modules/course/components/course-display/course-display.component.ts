import { Component, Input } from '@angular/core';
import { Course } from '../../../shared-types';

@Component({
  selector: 'app-course-display',
  templateUrl: './course-display.component.html',
})
export class CourseDisplayComponent {
  @Input() courses: Partial<Course>[] = [];
}
