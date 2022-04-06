import { Component, Input, OnInit } from '@angular/core';
import { Role, User } from '../../../../shared-types';
import { UserService } from '../../../../shared';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
})
export class UserRoleComponent implements OnInit {
  @Input() role: string = '';

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.userService.get();
  }

  checkRole = (roles: Partial<Role>[]): boolean =>
    !!roles.find((role: Partial<Role>) => role.name === this.role) || false;
}
