import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestorInfo } from '../../shared-types';
import { BaseForm } from './base-form.service';

@Injectable()
export class RequestorInfoForm extends BaseForm {
  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  override parseRoute(route: ActivatedRoute) {
    super.parseRoute(route);
  }

  generate = (record: Partial<RequestorInfo> = {}): FormGroup =>
    this.fb.group({
      // id: [record?.id],
      name: [record?.name],
      email: [record?.email],
      phoneNumber: [record?.phoneNumber],
    });

  patch = (record: Partial<RequestorInfo>) => ({
    ...record,
  });

  values = (form: FormGroup): Partial<RequestorInfo> => ({
    // id: form.get('id').value,
    name: form.get('name').value,
    email: form.get('email').value,
    phoneNumber: form.get('phoneNumber').value,
  });
}
