import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard, PageTitleResolver } from '../../../shared';
import {
  LayoutComponent,
  PlaylistsItemAdminComponent,
  PlaylistsItemTableComponent,
} from './components';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AdminGuard],
    data: { roles: ['admin'], title: 'Admin - Playlist Items' },
    children: [
      {
        path: 'list',
        component: PlaylistsItemTableComponent,
        canActivateChild: [AdminGuard],
        data: { roles: ['admin'], title: 'Admin - Playlist Items' },
        resolve: { pageData: PageTitleResolver },
      },
      {
        path: 'add',
        component: PlaylistsItemAdminComponent,
        canActivateChild: [AdminGuard],
        data: { roles: ['admin'], title: 'Admin - Playlist Item Add' },
        resolve: { pageData: PageTitleResolver },
      },
      {
        path: 'edit/:id',
        component: PlaylistsItemAdminComponent,
        canActivateChild: [AdminGuard],
        data: { roles: ['admin'], title: 'Admin - Playlist Item Edit' },
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
export class PlaylistsItemAdminRoutingModule {}
