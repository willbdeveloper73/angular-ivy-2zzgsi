import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormGroupDirective,
  Validator,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-form-group-item',
  templateUrl: './form-group-item.component.html',
  styleUrls: ['./form-group-item.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormGroupItemComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormGroupItemComponent),
      multi: true,
    },
  ],
})
export class FormGroupItemComponent implements OnInit {
  @Input() formGroupItem: AbstractControl;
  @Input() label: string = '';
  @Input() required: boolean = false;

  public formTouchFn;

  form: FormGroup;

  registerOnValidatorChange?(fn: () => void): void {}

  constructor() {}

  ngOnInit() {}

  writeValue(obj: any): void {
    // const emtptyForm = {
    //   name: null,
    //   email: null,
    //   phoeNumber: null,
    // };

    const data = Object.assign('', obj);
    this.form.patchValue(data);
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.formTouchFn = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  validate(control: AbstractControl): ValidationErrors {
    const form = this.form;
    if (form.valid) {
      return null;
    }

    const errors = {};
    Object.keys(form.controls).forEach((k) => {
      if (form.controls[k].invalid) {
        errors[k] = form.controls[k].errors;
      }
    });

    return errors;
  }
}
