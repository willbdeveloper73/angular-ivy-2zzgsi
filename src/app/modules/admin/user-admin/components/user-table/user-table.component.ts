import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserElements } from '../../../../shared-types';
import { UserService } from '../../../../shared';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
})
export class UserTableComponent implements OnInit {
  constructor(
    public service: UserService,
    @Inject('COLUMNS') public columns: any,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.get();
  }

  add() {
    this.router.navigate(['/admin/user/add']);
  }

  edit(item: Partial<User>) {
    this.router.navigate(['/admin/user/edit', item.id]);
  }

  delete(item: Partial<User>) {
    this.service.remove(item);
  }
}
