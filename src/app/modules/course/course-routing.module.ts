import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTitleResolver } from '../shared';
import {
  LayoutComponent,
  CategoryHomeComponent,
  CoursesAvailableComponent,
  CourseCategoryListComponent,
  // CourseDetailComponent,
  CourseLaunchComponent,
  // CourseListComponent,
} from './components';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: CategoryHomeComponent,
        // component: CoursesAvailableComponent,
        data: { title: 'All Courses' },
        resolve: { pageData: PageTitleResolver },
      },
      //   {
      //     path: 'tag/:id',
      //     component: CourseListComponent,
      //   },
      {
        path: 'category/:id',
        component: CourseCategoryListComponent,
        resolve: { pageData: PageTitleResolver },
      },
      //   {
      //     path: 'list',
      //     component: CourseListComponent,
      //   },
      //   {
      //     path: 'detail/:id',
      //     component: CourseDetailComponent,
      //   },
      {
        path: 'launch/:id',
        component: CourseLaunchComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
