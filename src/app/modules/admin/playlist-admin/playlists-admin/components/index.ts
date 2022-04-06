import { PlaylistsAdminComponent } from './playlists-admin';
import { PlaylistsTableComponent } from './playlists-table';
import { LayoutComponent } from './layout';

export const ComponentsExport = [];

export const Components = [
  ...ComponentsExport,
  PlaylistsAdminComponent,
  PlaylistsTableComponent,
  LayoutComponent,
];

export * from './playlists-admin';
export * from './playlists-table';
export * from './layout';
