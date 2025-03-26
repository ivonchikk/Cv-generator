
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Self,
  ViewEncapsulation
} from '@angular/core';
import {
  Validators,
  FormControl,
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Subscription } from 'rxjs';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'cv-gen-datepicker',
  templateUrl: './cv-gen-datepicker.component.html',
  styleUrl: './cv-gen-datepicker.component.scss',
  providers: [provideNativeDateAdapter(MY_FORMATS)],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvGenDatepickerComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() public placeholder: string = '';
  @Input() public label: string = '';

  public readonly datepickerControl: FormControl<Date> = new FormControl(new Date(), { validators: [Validators.required], nonNullable: true })
  private readonly subscription: Subscription = new Subscription();

  constructor(@Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public ngOnInit(): void {
    const datepicker = this.datepickerControl.valueChanges.subscribe((item: Date) => {
      if (this.datepickerControl.touched) {
        this.onTouched()
      }
      this.onChanged(item)
    })
    this.subscription.add(datepicker)
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onChanged!: (value: Date) => void;
  public onTouched!: () => void;

  public writeValue(val: Date): void {
    this.datepickerControl.patchValue(val);
  }
  public registerOnChange(fn: (value: Date) => void): void {
    this.onChanged = fn
  }
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }
}
