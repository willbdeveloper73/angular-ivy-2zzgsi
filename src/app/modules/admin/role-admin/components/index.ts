import { RoleAdminComponent } from './role-admin';
import { RoleTableComponent } from './role-table';
import { LayoutComponent } from './layout';
import { UserRoleComponent } from './user-role';

export const ComponentsExport = [];

export const Components = [
  ...ComponentsExport,
  RoleAdminComponent,
  RoleTableComponent,
  UserRoleComponent,
  LayoutComponent,
];

export * from './role-admin';
export * from './role-table';
export * from './layout';
export * from './user-role';
