import { Component, forwardRef, Inject, OnInit } from '@angular/core';
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

import { RequestorInfoForm } from '../../../shared';

@Component({
  selector: 'app-requestor-info-form',
  templateUrl: './requestor-info-form.component.html',
  styleUrls: ['./requestor-info-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RequestorInfoFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RequestorInfoFormComponent),
      multi: true,
    },
  ],
})
export class RequestorInfoFormComponent
  implements OnInit, ControlValueAccessor, Validator
{
  public form: FormGroup;
  public formTouchFn;

  registerOnValidatorChange?(fn: () => void): void {}

  constructor(
    @Inject('COLUMNS') public elements: any,
    private formBuilder: FormBuilder,
    // private ngForm: FormGroupDirective,
    private requestorInfoForm: RequestorInfoForm
  ) {}

  ngOnInit(): void {
    this.form = this.requestorInfoForm.generate();
  }

  writeValue(obj: any): void {
    const emtptyForm = {
      name: null,
      email: null,
      phoeNumber: null,
    };

    const data = Object.assign(emtptyForm, obj);
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
