import { Component } from '@angular/core';
import { CourseService } from '../../../shared';

@Component({
  selector: 'app-courses-display',
  templateUrl: './courses-display.component.html',
  styleUrls: ['./courses-display.component.css'],
})
export class CoursesDisplayComponent {
  constructor(public service: CourseService) {}
}
