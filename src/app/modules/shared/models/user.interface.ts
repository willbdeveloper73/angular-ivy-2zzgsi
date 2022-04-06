import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Enrollment } from '../../shared-types';
import { BaseName } from './base-name.interface';
import { Role } from './role.interface';
import { Settings } from './settings.interface';
import { Watched } from './watched.interface';

import { FormTableElement } from './form-table-element.interface';

export interface User extends BaseName {
  guid?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  displayName?: string;
  emailAddress?: string;
  distinguishedName?: string;
  samAccountName?: string;
  userPrincipalName?: string;
  voiceTelephoneNumber?: string;
  socketName?: string;
  picture?: string;
  color?: string;
  status?: string;

  settings?: Partial<Settings>;

  roles?: Partial<Role>[];
  enrollments?: Partial<Enrollment>[];
  watched?: Partial<Watched>[];
}

@Injectable()
export class UserForm {
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

  generate = (record: Partial<User> = {}): FormGroup =>
    this.fb.group({
      id: [record?.id],
      guid: [record?.guid],
      name: [record?.name],
      lastName: [record?.lastName],
      firstName: [record?.firstName],
      middleName: [record?.middleName],
      displayName: [record?.displayName],
      emailAddress: [record?.emailAddress],
      distinguishedName: [record?.distinguishedName],
      samAccountName: [record?.samAccountName],
      userPrincipalName: [record?.userPrincipalName],
      voiceTelephoneNumber: [record?.voiceTelephoneNumber],
      socketName: [record?.socketName],
      picture: [record?.picture],
      color: [record?.color],
      status: [record?.status],
    });

  patch = (record: Partial<User>) => ({
    ...record,
  });

  values = (form: FormGroup): Partial<User> => ({
    id: form.get('id').value,
    guid: form.get('guid').value,
    name: form.get('name').value,
    lastName: form.get('lastName').value,
    firstName: form.get('firstName').value,
    middleName: form.get('middleName').value,
    displayName: form.get('displayName').value,
    emailAddress: form.get('emailAddress').value,
    distinguishedName: form.get('distinguishedName').value,
    samAccountName: form.get('samAccountName').value,
    userPrincipalName: form.get('userPrincipalName').value,
    voiceTelephoneNumber: form.get('voiceTelephoneNumber').value,
    socketName: form.get('socketName').value,
    picture: form.get('picture').value,
    color: form.get('color').value,
    status: form.get('status').value,
  });
}

export const UserElements: Partial<FormTableElement>[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    tableDisplay: true,
  },
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    tableDisplay: true,
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    tableDisplay: true,
  },
  {
    name: 'middleName',
    label: 'Middle Name',
    type: 'text',
    tableDisplay: false,
  },
  {
    name: 'displayName',
    label: 'Display Name',
    type: 'text',
    tableDisplay: true,
  },
  {
    name: 'emailAddress',
    label: 'Email Address',
    type: 'text',
    tableDisplay: false,
  },
  {
    name: 'distinguishedName',
    label: 'Distinguished Name',
    type: 'text',
    tableDisplay: false,
  },
  {
    name: 'samAccountName',
    label: 'SAM Account Name',
    type: 'text',
    tableDisplay: false,
  },
  {
    name: 'userPrincipalName',
    label: 'User Princpal Name',
    type: 'text',
    tableDisplay: false,
  },
  {
    name: 'voiceTelephoneNumber',
    label: 'Voice Telephone Number',
    type: 'text',
    tableDisplay: false,
  },
  {
    name: 'picture',
    label: 'Image',
    type: 'text',
    tableDisplay: false,
  },
  {
    name: 'color',
    label: 'User Color',
    type: 'text',
    tableDisplay: true,
  },
];
