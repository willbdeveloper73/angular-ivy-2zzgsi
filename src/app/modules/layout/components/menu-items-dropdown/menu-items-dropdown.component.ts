import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarItem } from '../../../shared-types';

@Component({
  selector: 'app-menu-items-dropdown',
  templateUrl: './menu-items-dropdown.component.html',
  styleUrls: ['./menu-items-dropdown.component.css'],
})
export class MenuItemsDropdownComponent {
  @Input() menu: Partial<NavbarItem> = {};
  @Input() text_color: string = 'text-app-accent';

  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
