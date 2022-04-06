import { FormItemBase } from './form-item-base';

export class FormItemTextbox extends FormItemBase<string> {
  override controlType = 'textbox';
}
