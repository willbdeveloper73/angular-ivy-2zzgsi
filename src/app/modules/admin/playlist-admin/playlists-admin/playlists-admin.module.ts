import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayListElements } from '../../../shared-types';
import { SharedModule, PlayListForm } from '../../../shared';
import { TableModule } from '../../../table';
import { FormModule } from '../../../form';
import { PlaylistsAdminRoutingModule } from './playlists-admin-routing.module';
import { Components, ComponentsExport } from './components';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TableModule,
    FormModule,
    PlaylistsAdminRoutingModule,
  ],
  declarations: [...Components],
  exports: [...ComponentsExport],
  providers: [
    PlayListForm,
    {
      provide: 'COLUMNS',
      useValue: () => {
        return PlayListElements;
      },
    },
  ],
})
export class PlaylistsAdminModule {}
