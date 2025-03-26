import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, Self, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'cv-gen-textarea',
  templateUrl: './cv-gen-textarea.component.html',
  styleUrl: './cv-gen-textarea.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvGenTextareaComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() public placeholder: string = '';
  @Input() public label: string = '';

  public readonly textareaControl: FormControl<string> = new FormControl('', { validators: [Validators.required], nonNullable: true })
  private readonly subscription: Subscription = new Subscription();

  constructor(@Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public ngOnInit(): void {
    const textarea = this.textareaControl.valueChanges.subscribe((item: string) => {
      if (this.textareaControl.touched) {
        this.onTouched()
      }
      this.onChanged(item)
    })
    this.subscription.add(textarea)
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onChanged!: (value: string) => void;
  public onTouched!: () => void;

  public writeValue(val: string): void {
    this.textareaControl.patchValue(val);
  }
  public registerOnChange(fn: (value: string) => void): void {
    this.onChanged = fn
  }
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }
}
