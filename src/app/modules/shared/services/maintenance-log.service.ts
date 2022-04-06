import { Injectable } from '@angular/core';
import { MaintenanceLog } from '../../shared-types';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class MaintenanceLogService extends CrudService<MaintenanceLog> {
  _items = [];
  constructor() {
    super();
  }
}
