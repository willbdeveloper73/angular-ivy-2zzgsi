import { PlaylistsItemAdminComponent } from './playlists-item-admin';
import { PlaylistsItemTableComponent } from './playlists-item-table';
import { LayoutComponent } from './layout';

export const ComponentsExport = [];

export const Components = [
  ...ComponentsExport,
  PlaylistsItemAdminComponent,
  PlaylistsItemTableComponent,
  LayoutComponent,
];

export * from './playlists-item-admin';
export * from './playlists-item-table';
export * from './layout';
