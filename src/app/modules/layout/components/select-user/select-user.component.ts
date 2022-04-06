import { Component } from '@angular/core';
import { AuthenticatedUserService, UserService } from '../../../shared';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
})
export class SelectUserComponent {
  constructor(
    public authenticatedUser: AuthenticatedUserService,
    public users: UserService
  ) {
    this.users.get();
  }

  changeUser(value: string) {
    const userId = parseInt(value, 10);
    this.authenticatedUser.get(userId);
  }
}
