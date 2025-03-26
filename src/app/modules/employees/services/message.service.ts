import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  public showSuccessMessage(message: string) {
    alert(message)
  }

  public showErrorMessage(message: string) {
    alert(message)
  }

  public showWarningMessage(message: string) {
    alert(message)
  }

  public showQuestion(message: string) {
    const question = confirm(message)
    return question
  }
}
