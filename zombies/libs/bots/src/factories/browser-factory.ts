import { Injectable } from '@nestjs/common';
import * as Nightmare from 'nightmare';

@Injectable()
export class BrowserFactory {
  private browser: Nightmare;

  constructor() {
    this.browser = new Nightmare();
  }

  getBrowser() {
    return this.browser;
  }
}
