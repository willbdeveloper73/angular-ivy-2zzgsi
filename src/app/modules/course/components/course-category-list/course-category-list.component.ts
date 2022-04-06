import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoryService } from '../../../shared';

@Component({
  selector: 'app-course-category-list',
  templateUrl: './course-category-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCategoryListComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    public service: CategoryService // public service: CourseService,
  ) {}

  ngOnInit() {
    this.route.paramMap
      // .pipe(tap((params: ParamMap) => console.log('params:', params)))
      .subscribe((params: ParamMap) => {
        const categoryStr = params.get('id');
        if (categoryStr) {
          const categoryId = parseInt(categoryStr, 10);
          this.service.get(categoryId);
        }
        // console.log('this.categoryId:', this.categoryId);
        // if (categoryId) {
        //   this.service.getAllForCategory(this.categoryId);
        //   this.categoryService.get(this.categoryId);
        // } else {
        //   this.service.get();
        // }
      });
  }
}
