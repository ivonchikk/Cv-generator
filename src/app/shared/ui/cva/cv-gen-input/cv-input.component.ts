import {
  ChangeDetectionStrategy,
  Component, forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Self,
  ViewEncapsulation
} from '@angular/core';
import {
  Validators,
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-cv-gen-input',
  templateUrl: './cv-input.component.html',
  styleUrl: './cv-input.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvInputComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() public type = '';
  @Input() public placeholder: string = '';
  @Input() public label: string = '';

  public readonly cvInputControl: FormControl<string> = new FormControl('', { validators: [Validators.required], nonNullable: true })
  private readonly subscription: Subscription = new Subscription();
  constructor(@Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public get invalid(): boolean | null {
    return this.ngControl ? this.ngControl.invalid : false;
  }

  ngOnInit() {
    const input = this.cvInputControl.valueChanges.subscribe((item: string) => {
      if (this.cvInputControl.touched) {
        this.onTouched()
      }
      this.onChanged(item)
    })
    this.subscription.add(input)
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onChanged!: (value: string) => void;
  public onTouched!: () => void;

  public writeValue(val: string): void {
    this.cvInputControl.patchValue(val);
  }
  public registerOnChange(fn: (value: string) => void): void {
    this.onChanged = fn
  }
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }
  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.cvInputControl.disable() : this.cvInputControl.enable()
  }
}
