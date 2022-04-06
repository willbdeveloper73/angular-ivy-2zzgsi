import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components';
import { AdminGuard } from '../../shared';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AdminGuard],
    data: { roles: ['admin'] },
    children: [
      {
        path: 'playlists',
        canActivate: [AdminGuard],
        data: { roles: ['admin'], title: 'Admin - Playlists' },
        loadChildren: () =>
          import('./playlists-admin/playlists-admin.module').then(
            (m) => m.PlaylistsAdminModule
          ),
      },
      {
        path: 'playlists-item',
        canActivateChild: [AdminGuard],
        data: { roles: ['admin'], title: 'Admin - Playlists Items' },
        loadChildren: () =>
          import('./playlists-item-admin/playlists-item-admin.module').then(
            (m) => m.PlaylistsItemAdminModule
          ),
      },
      {
        path: 'playlists-source',
        canActivateChild: [AdminGuard],
        data: { roles: ['admin'], title: 'Admin - Playlists Sources' },
        loadChildren: () =>
          import('./playlists-source-admin/playlists-source-admin.module').then(
            (m) => m.PlaylistsSourceAdminModule
          ),
      },
      { path: '**', pathMatch: 'full', redirectTo: 'playlists' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistAdminRoutingModule {}
