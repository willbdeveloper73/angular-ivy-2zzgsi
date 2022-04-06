import { Component } from '@angular/core';
import { MenuService } from '../../../menu';

@Component({
	selector: 'app-top-nav',
	templateUrl: './top-nav.component.html',
})
export class TopNavComponent {
	constructor(public menu: MenuService) {}
}
