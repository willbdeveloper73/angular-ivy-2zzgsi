import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { TableModule } from '../../table';
import { FormModule } from '../../form';
import { PlaylistAdminRoutingModule } from './playlist-admin-routing.module';
import { Components, ComponentsExport } from './components';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TableModule,
    FormModule,
    PlaylistAdminRoutingModule,
  ],
  declarations: [...Components],
  exports: [...ComponentsExport],
})
export class PlaylistAdminModule {}
