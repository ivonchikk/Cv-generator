import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonTypes } from './button-types.enum';

@Component({
  selector: 'app-cv-gen-button',
  templateUrl: './cv-gen-button.component.html',
  styleUrl: './cv-gen-button.component.scss'
})
export class CvGenButtonComponent {
  @Output() public btnClick: EventEmitter<string> = new EventEmitter<string>()
  @Input() public buttonTypes!: ButtonTypes
  
  public onBtnClick() {
    this.btnClick.emit()
  }
}

