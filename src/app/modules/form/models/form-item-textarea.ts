import { FormItemBase } from './form-item-base';

export class FormItemTextarea extends FormItemBase<string> {
  override controlType = 'textarea';
}
