import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { rawCategory } from './rawData';
import { Category } from '../../shared-types';

@Injectable({ providedIn: 'root' })
export class CategoryService extends CrudService<Category> {
  _items = rawCategory;

  constructor() {
    super();
  }
}
