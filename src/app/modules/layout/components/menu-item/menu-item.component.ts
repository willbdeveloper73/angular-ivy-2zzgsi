import { Component, Input } from '@angular/core';
import { NavbarItem } from '../../../shared-types';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
})
export class MenuItemComponent {
  @Input() item: Partial<NavbarItem> = {};
  @Input() text_color: string = 'text-app-accent';
}
