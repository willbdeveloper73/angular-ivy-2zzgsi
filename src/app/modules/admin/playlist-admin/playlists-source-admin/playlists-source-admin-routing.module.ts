import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard, PageTitleResolver } from '../../../shared';
import {
  LayoutComponent,
  PlaylistsSourceAdminComponent,
  PlaylistsSourceTableComponent,
} from './components';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AdminGuard],
    data: { roles: ['admin'], title: 'Admin - Playlist Sources' },
    children: [
      {
        path: 'list',
        component: PlaylistsSourceTableComponent,
        canActivateChild: [AdminGuard],
        data: { roles: ['admin'], title: 'Admin - Playlist Sources' },
        resolve: { pageData: PageTitleResolver },
      },
      {
        path: 'add',
        component: PlaylistsSourceAdminComponent,
        canActivateChild: [AdminGuard],
        data: { roles: ['admin'], title: 'Admin - Playlist Source Add' },
        resolve: { pageData: PageTitleResolver },
      },
      {
        path: 'edit/:id',
        component: PlaylistsSourceAdminComponent,
        canActivateChild: [AdminGuard],
        data: { roles: ['admin'], title: 'Admin - Playlist Source Edit' },
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
export class PlaylistsSourceAdminRoutingModule {}
