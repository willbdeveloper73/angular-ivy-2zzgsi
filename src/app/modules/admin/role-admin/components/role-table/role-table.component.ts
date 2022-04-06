import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role, RoleElements } from '../../../../shared-types';
import { RoleService } from '../../../../shared';

@Component({
  selector: 'app-role-table',
  templateUrl: './role-table.component.html',
})
export class RoleTableComponent implements OnInit {
  constructor(
    public service: RoleService,
    @Inject('COLUMNS') public columns: any,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.get();
  }

  add() {
    this.router.navigate(['/admin/role/add']);
  }

  edit(item: Partial<Role>) {
    this.router.navigate(['/admin/role/edit', item.id]);
  }

  delete(item: Partial<Role>) {
    this.service.remove(item);
  }
}
