import { Component, VERSION } from '@angular/core';
import { AuthenticatedUserService } from './modules/shared';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  constructor(public authenticated: AuthenticatedUserService) {
    this.authenticated.get(4);
  }
}
