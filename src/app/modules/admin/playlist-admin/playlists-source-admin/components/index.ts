import { PlaylistsSourceAdminComponent } from './playlists-source-admin';
import { PlaylistsSourceTableComponent } from './playlists-source-table';
import { LayoutComponent } from './layout';

export const ComponentsExport = [];

export const Components = [
  ...ComponentsExport,
  PlaylistsSourceAdminComponent,
  PlaylistsSourceTableComponent,
  LayoutComponent,
];

export * from './playlists-source-admin';
export * from './playlists-source-table';
export * from './layout';
