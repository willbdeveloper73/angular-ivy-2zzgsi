import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './modules/shared';

const routes: Routes = [
  // {
  //   path: 'mycourses',
  //   loadChildren: () =>
  //     import('./modules/user-course/user-course.module').then(
  //       (m) => m.UserCourseModule
  //     ),
  // },
  {
    path: 'course',
    loadChildren: () =>
      import('./modules/course/course.module').then((m) => m.CourseModule),
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    data: { roles: ['admin'] },
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
  },
  {
    path: 'support',
    loadChildren: () =>
      import('./modules/support/support.module').then((m) => m.SupportModule),
  },
  // {
  //   path: '',
  //   component: LayoutComponent,
  // },
  { path: '**', pathMatch: 'full', redirectTo: 'course' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
