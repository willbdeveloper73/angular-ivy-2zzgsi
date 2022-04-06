import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard, PageTitleResolver } from '../../shared';
// import { LayoutComponent } from './components/layout/layout.component';
// import { CoursesRequestedEditComponent } from './components/courses-requested-edit/courses-requested-edit.component';
// import { CoursesRequestedTableComponent } from './components/courses-requested-table/courses-requested-table.component';
import {
  LayoutComponent,
  CoursesRequestedEditComponent,
  CoursesRequestedTableComponent,
} from './components';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AdminGuard],
    data: { roles: ['admin'], title: 'Admin - Courses Requested' },
    children: [
      {
        path: 'list',
        component: CoursesRequestedTableComponent,
        canActivateChild: [AdminGuard],
        data: { roles: ['admin'], title: 'Admin - Courses Requested' },
        resolve: { pageData: PageTitleResolver },
      },
      {
        path: 'edit/:id',
        component: CoursesRequestedEditComponent,
        canActivateChild: [AdminGuard],
        data: { roles: ['admin'], title: 'Admin - Course Requested Edit' },
        resolve: { pageData: PageTitleResolver },
      },
      { path: '**', pathMatch: 'full', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRequestedRoutingModule {}
