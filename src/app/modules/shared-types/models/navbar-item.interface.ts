export interface NavbarItem {
  link?: string;
  icon?: string;
  text?: string;
  items?: Partial<NavbarItem>[];
  role?: string;
}
