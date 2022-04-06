import { CoursesRequestedEditComponent } from './courses-requested-edit';
import { CoursesRequestedTableComponent } from './courses-requested-table';
import { LayoutComponent } from './layout';

export const ComponentsExport = [];

export const Components = [
  ...ComponentsExport,
  CoursesRequestedEditComponent,
  CoursesRequestedTableComponent,
  LayoutComponent,
];

export * from './courses-requested-edit';
export * from './courses-requested-table';
export * from './layout';
