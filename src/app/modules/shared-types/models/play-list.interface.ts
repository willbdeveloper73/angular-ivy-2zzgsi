import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseName } from './base-name.interface';
import { formatDate } from '@angular/common';
import { Tag } from './tag.interface';
import { Course } from './course.interface';
import { PlayListItem } from './play-list-item.interface';
import { FormTableElement } from './form-table-element.interface';
import { Status } from './status.interface';
import { convertDate } from './utils';

export interface PlayList extends BaseName {
  description?: string;
  thumbnail?: string;
  duration?: number;
  statusId?: number;
  //   isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  courses?: Partial<Course>[];
  tags?: Partial<Tag>[];
  items?: Partial<PlayListItem>[];
  status?: Partial<Status>[];
}

export const generatePlayListForm = (
  fb: FormBuilder,
  record: Partial<PlayList> = {}
): FormGroup =>
  fb.group({
    id: [record?.id],
    name: [record?.name],
    description: [record?.description],
    thumbnail: [record?.thumbnail],
    statusId: [record?.statusId],
    createdAt: [convertDate(record?.createdAt)],
    updatedAt: [convertDate(record?.updatedAt)],
    deletedAt: [convertDate(record?.deletedAt)],
  });

export const generatePlayListFromForm = (form: FormGroup): PlayList => {
  const record: Partial<PlayList> = {
    id: form.get('id').value,
    name: form.get('name').value,
    description: form.get('description').value,
    statusId: parseInt(form.get('statusId').value, 10),
    thumbnail: form.get('thumbnail').value,
    createdAt: form.get('createdAt').value,
    updatedAt: form.get('updatedAt').value,
    deletedAt: form.get('deletedAt').value,
  };
  return record;
};

export const PlayListElements: Partial<FormTableElement>[] = [
  {
    name: 'name',
    label: 'Playlist Name',
    type: 'text',
    required: true,
    tableDisplay: true,
    display: true,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    tableDisplay: true,
    display: true,
  },
  {
    name: 'statusId',
    label: 'Status',
    type: 'select',
    data: (row: Partial<PlayList>) => null,
    tableDisplay: true,
    display: true,
  },
  {
    name: 'thumbnail',
    label: 'Thumbnail',
    type: 'text',
    tableDisplay: true,
    display: true,
  },
  {
    name: 'createdAt',
    label: 'Date Created',
    type: 'date',
    dateFormat: 'yyyy-MM-dd',
    tableDisplay: true,
    display: true,
  },
  {
    name: 'updatedAt',
    label: 'Date Updated',
    type: 'date',
    dateFormat: 'yyyy-MM-dd',
    tableDisplay: true,
    display: true,
  },
  {
    name: 'deletedAt',
    label: 'Date Deleted',
    type: 'date',
    dateFormat: 'yyyy-MM-dd',
    tableDisplay: false,
    display: false,
  },
];
