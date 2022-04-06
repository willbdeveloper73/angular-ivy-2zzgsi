import { Injectable } from '@angular/core';
import { Status } from '../../shared-types';
import { CrudService } from './crud.service';
import { rawStatus } from './rawData';

@Injectable({ providedIn: 'root' })
export class StatusService extends CrudService<Status> {
  _items = rawStatus;

  constructor() {
    super();
  }
}
