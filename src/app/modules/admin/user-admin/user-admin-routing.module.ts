import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard, PageTitleResolver } from '../../shared';
import {
  LayoutComponent,
  UserAdminComponent,
  UserTableComponent,
} from './components';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AdminGuard],
    data: { roles: ['admin'], title: 'Admin - Maintenance Log' },
    children: [
      {
        path: 'list',
        component: UserTableComponent,
        canActivateChild: [AdminGuard],
        data: { roles: ['admin'], title: 'Admin - User Administration' },
        resolve: { pageData: PageTitleResolver },
      },
      {
        path: 'add',
        component: UserAdminComponent,
        canActivateChild: [AdminGuard],
        data: { roles: ['admin'], title: 'Admin - User Administration Add' },
        resolve: { pageData: PageTitleResolver },
      },
      {
        path: 'edit/:id',
        component: UserAdminComponent,
        canActivateChild: [AdminGuard],
        data: { roles: ['admin'], title: 'Admin - User Administration Edit' },
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
export class UserAdminRoutingModule {}
