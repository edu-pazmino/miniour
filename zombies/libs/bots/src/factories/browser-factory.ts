import { Injectable } from '@nestjs/common';
import * as Nightmare from 'nightmare';

@Injectable()
export class BrowserFactory {
  end() {
    return this.browser.end();
  }
  private browser: Nightmare;

  constructor() {
    this.browser = new Nightmare();
  }

  getBrowser() {
    return this.browser;
  }
}
