import { LayoutComponent } from './layout';
import { MaintenanceLogEditComponent } from './maintenance-log-edit';
import { MaintenanceLogTableComponent } from './maintenance-log-table';

export const ComponentsExport = [];

export const Components = [
  ...ComponentsExport,
  LayoutComponent,
  MaintenanceLogEditComponent,
  MaintenanceLogTableComponent,
];

export * from './layout';
export * from './maintenance-log-edit';
export * from './maintenance-log-table';
