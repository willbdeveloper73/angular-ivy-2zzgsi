import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceLogAdminElements } from '../../shared-types';
import { MaintenanceLogForm } from '../../shared';
import { TableModule } from '../../table';
import { FormModule } from '../../form';
import { MaintenanceLogRoutingModule } from './maintenance-log-routing.module';
import { Components, ComponentsExport } from './components';

@NgModule({
  imports: [CommonModule, TableModule, FormModule, MaintenanceLogRoutingModule],
  declarations: [...Components],
  exports: [...ComponentsExport],
  providers: [
    MaintenanceLogForm,
    {
      provide: 'COLUMNS',
      useValue: () => {
        return MaintenanceLogAdminElements;
      },
    },
  ],
})
export class MaintenanceLogModule {}
