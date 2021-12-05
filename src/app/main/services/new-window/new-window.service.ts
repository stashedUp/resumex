import { Injectable } from '@angular/core';

@Injectable()
export class NewWindowService {

  constructor() { }
  
  getNativeWindow() {
      return window;
  }
}
