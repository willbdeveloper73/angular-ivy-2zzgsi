import { Injectable } from '@angular/core';
import { User } from '../../shared-types';
import { CrudService } from './crud.service';
import { rawUsers } from './rawData';

@Injectable({ providedIn: 'root' })
export class UserService extends CrudService<User> {
  _items = rawUsers;

  printRaw = () => console.log('users:raw:', this._items);

  constructor() {
    super();
  }

  public override save(item: Partial<User>): void {
    if (!item.id) {
      item.id = this.getNextId();
    }
    const foundRecord = this._items.find(
      (original: Partial<User>) => original.id === item.id
    );
    if (!item?.roles && foundRecord?.roles) {
      item.roles = foundRecord?.roles;
    }
    if (!item?.enrollments && foundRecord?.enrollments) {
      item.enrollments = foundRecord?.enrollments;
    }
    super.save(item);
  }
}
