import { CourseAdminComponent } from './course-admin';
import { CourseModalComponent } from './course-modal';
import { CourseTableComponent } from './course-table';
import { LayoutComponent } from './layout';

export const ComponentsExport = [];

export const Components = [
  ...ComponentsExport,
  CourseAdminComponent,
  CourseModalComponent,
  CourseTableComponent,
  LayoutComponent,
];

export * from './course-admin';
export * from './course-modal';
export * from './course-table';
export * from './layout';
