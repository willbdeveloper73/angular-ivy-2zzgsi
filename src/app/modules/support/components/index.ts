import { CourseRequestComponent } from './course-request';
import { CourseRequestFormComponent } from './course-request-form';
import { LayoutComponent } from './layout';
import { MaintenanceLogFormComponent } from './maintenance-log-form';

export const ComponentsExport = [];

export const Components = [
  ...ComponentsExport,
  CourseRequestComponent,
  CourseRequestFormComponent,
  MaintenanceLogFormComponent,
  LayoutComponent,
];

export * from './course-request';
export * from './course-request-form';
export * from './layout';
export * from './maintenance-log-form';
