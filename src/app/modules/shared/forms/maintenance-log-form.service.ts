import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseForm } from './base-form.service';
import { MaintenanceLog } from '../../shared-types';

import { convertDate } from './utils';

@Injectable()
export class MaintenanceLogForm extends BaseForm {
  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  override parseRoute(route: ActivatedRoute) {
    super.parseRoute(route);
  }

  generate = (record: Partial<MaintenanceLog> = {}): FormGroup =>
    this.fb.group({
      id: [record?.id],
      submittedByName: [record?.submittedByName],
      submittedDate: [convertDate(record?.submittedDate)],
      issueType: [record?.issueType],
      description: [record?.description],
      accepted: [record?.accepted],
      acceptedDate: [convertDate(record?.acceptedDate)],
      statusId: [record?.statusId],
    });

  patch = (record: Partial<MaintenanceLog>) => ({
    ...record,
    submittedDate: [convertDate(record?.submittedDate)],
    acceptedDate: [convertDate(record?.acceptedDate)],
  });

  values = (form: FormGroup): Partial<MaintenanceLog> => ({
    id: form.get('id').value,
    submittedByName: form.get('submittedByName').value,
    submittedDate: new Date(form.get('submittedDate').value),
    issueType: form.get('issueType').value,
    description: form.get('description').value,
    accepted: form.get('accepted').value,
    acceptedDate: new Date(form.get('acceptedDate').value),
    statusId: parseInt(form.get('statusId').value, 10),
  });
}
