import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseForm } from './base-form.service';
import { Category } from '../../shared-types';

import { convertDate } from './utils';

@Injectable()
export class CategoryForm extends BaseForm {
  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  override parseRoute(route: ActivatedRoute) {
    super.parseRoute(route);
  }

  generate = (record: Partial<Category> = {}): FormGroup =>
    this.fb.group({
      id: [record?.id],
      name: [record?.name],
      description: [record?.description],
      image: [record?.image],
    });

  patch = (record: Partial<Category>) => ({
    ...record,
  });

  values = (form: FormGroup): Partial<Category> => ({
    id: form.get('id').value,
    name: form.get('name').value,
    description: form.get('description').value,
    image: form.get('image').value,
  });
}
