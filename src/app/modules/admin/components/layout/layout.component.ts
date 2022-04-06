import { Component } from '@angular/core';
import { MenuService } from '../../../menu';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(public service: MenuService) {}
}
