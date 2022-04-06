import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseName } from './base-name.interface';
import { FormTableElement } from './form-table-element.interface';

export interface Role extends BaseName {}

@Injectable()
export class RoleForm {
  #id: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  id$: Observable<number> = this.#id.asObservable();

  constructor(private fb: FormBuilder) {}

  parseRoute(route: ActivatedRoute) {
    route.paramMap
      .pipe(
        map((params: ParamMap) => {
          const paramId = params.get('id');
          if (!paramId) return null;
          return parseInt(paramId, 10);
        })
      )
      .subscribe((id: number) => this.#id.next(id));
  }

  generate = (record: Partial<Role> = {}): FormGroup =>
    this.fb.group({
      id: [record?.id],
      name: [record?.name],
    });

  patch = (record: Partial<Role>) => ({
    ...record,
  });

  values = (form: FormGroup): Partial<Role> => ({
    id: form.get('id').value,
    name: form.get('name').value,
  });
}

export const RoleElements: Partial<FormTableElement>[] = [
  {
    name: 'name',
    label: 'Course Name',
    type: 'text',
    required: true,
    tableDisplay: true,
  },
];
