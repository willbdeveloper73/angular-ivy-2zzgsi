import {
  Component,
  OnDestroy,
  OnInit,
  Optional,
  SkipSelf,
} from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-form-value-renderer',
  templateUrl: './form-value-renderer.component.html',
})
export class FormValueRendererComponent implements OnInit, OnDestroy {
  private formGroup: FormGroup;
  formValue: FormGroup;
  // formValue$: Observable<FormGroup>;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @SkipSelf()
    @Optional()
    private container: ControlContainer
  ) {}

  ngOnInit(): void {
    this.formGroup = this.container.control as FormGroup;
    this.formGroup.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((formValue) => {
        // this.formValue$ = of(formValue);
        this.formValue = formValue;
      });

    this.formGroup.enable();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
