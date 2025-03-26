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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cv-gen-select',
  templateUrl: './cv-gen-select.component.html',
  styleUrl: './cv-gen-select.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CvGenSelectComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() public placeholder: string = '';
  @Input() public label: string = '';
  @Input() public options: string[] = [];

  public readonly selectControl: FormControl<string> = new FormControl('', { validators: [Validators.required], nonNullable: true })
  private readonly subscription: Subscription = new Subscription();

  constructor(@Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    const select = this.selectControl.valueChanges.subscribe((item: string) => {
      if (this.selectControl.touched) {
        this.onTouched()
      }
      this.onChanged(item)
    })
    this.subscription.add(select)
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onChanged!: (value: string) => void;
  public onTouched!: () => void;

  public writeValue(val: string): void {
    this.selectControl.patchValue(val);
  }
  public registerOnChange(fn: (value: string) => void): void {
    this.onChanged = fn
  }
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }
  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.selectControl.disable() : this.selectControl.enable()
  }
}
