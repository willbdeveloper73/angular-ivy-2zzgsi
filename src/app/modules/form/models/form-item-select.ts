import { FormItemBase } from './form-item-base';

export class FormItemDropdown extends FormItemBase<string> {
  override controlType = 'select';
}
