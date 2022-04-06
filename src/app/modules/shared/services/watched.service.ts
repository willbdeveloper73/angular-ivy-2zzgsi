import { Injectable } from '@angular/core';
import { Watched } from '../../shared-types';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class WatchedService extends CrudService<Watched> {
  _items = [];

  printRaw = () => console.log('users:watched:', this._items);

  constructor() {
    super();
  }

  getForUser(userId: number): Partial<Watched>[] {
    const watched = this._items.filter(
      (record: Partial<Watched>) => record.userId === userId
    );
    return watched;
  }
}
