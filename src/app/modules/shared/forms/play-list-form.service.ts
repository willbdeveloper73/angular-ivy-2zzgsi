import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormTableElement, PlayList } from '../../shared-types';
import { convertDate } from './utils';

@Injectable()
export class PlayListForm {
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

  generate = (record: Partial<PlayList> = {}): FormGroup =>
    this.fb.group({
      id: [record?.id],
      name: [record?.name],
      description: [record?.description],
      thumbnail: [record?.thumbnail],
      statusId: [record?.statusId],
      createdAt: [convertDate(record?.createdAt)],
      updatedAt: [convertDate(record?.updatedAt)],
      deletedAt: [convertDate(record?.deletedAt)],
    });

  patch = (record: Partial<PlayList>) => ({
    ...record,
    createdAt: convertDate(record?.createdAt),
    updatedAt: convertDate(record?.updatedAt),
    deletedAt: convertDate(record?.deletedAt),
  });

  values = (form: FormGroup): Partial<PlayList> => ({
    id: form.get('id').value,
    name: form.get('name').value,
    description: form.get('description').value,
    statusId: parseInt(form.get('statusId').value, 10),
    thumbnail: form.get('thumbnail').value,
    createdAt: form.get('createdAt').value,
    updatedAt: form.get('updatedAt').value,
    deletedAt: form.get('deletedAt').value,
  });
}
