import { LayoutComponent } from './layout';
import { BrandComponent } from './brand';
import { MenuItemComponent } from './menu-item';
import { MenuItemsDropdownComponent } from './menu-items-dropdown';
import { SearchBarComponent } from './search-bar';
import { SelectUserComponent } from './select-user';
import { TopNavComponent } from './top-nav';
import { UserProfileComponent } from './user-profile';

export const ComponentsExport = [LayoutComponent];

export const Components = [
  ...ComponentsExport,
  BrandComponent,
  MenuItemComponent,
  MenuItemsDropdownComponent,
  SearchBarComponent,
  SelectUserComponent,
  TopNavComponent,
  UserProfileComponent,
];
