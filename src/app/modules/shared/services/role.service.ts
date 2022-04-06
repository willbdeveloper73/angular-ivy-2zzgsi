import { Injectable } from '@angular/core';
import { Role } from '../../shared-types';
import { CrudService } from './crud.service';
import { rawRoles } from './rawData';

@Injectable({ providedIn: 'root' })
export class RoleService extends CrudService<Role> {
  _items = rawRoles;

  constructor() {
    super();
  }
}
