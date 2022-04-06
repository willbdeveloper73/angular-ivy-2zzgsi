import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { CourseRequest } from '../../shared-types';

@Injectable({ providedIn: 'root' })
export class CourseRequestService extends CrudService<CourseRequest> {
  constructor() {
    super();
  }
}
