import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignalService {
  private message = signal<string>('');

  localData = localStorage.getItem('fromsList');

  constructor() {}
  setMessage(inputMessage: any) {
    this.message.update(() => inputMessage);
  }
  getMessage() {
    return this.message;
  }
}
