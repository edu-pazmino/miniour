import { injectable } from "inversify";
import Nightmare from "nightmare";
import { isFalsy } from "utility-types";
import { Bot } from "./bot.js";

const selectText = (selector: string) =>
  document.querySelector(selector).innerHTML;

@injectable()
export class NightmareBot implements Bot {
  private readonly nightmare: Nightmare;

  constructor() {
    this.nightmare = new Nightmare();
  }

  async navigate(url: string, waitSelector?: string) {
    this.assertParams(url, waitSelector);

    await this.nightmare.goto(url).wait(waitSelector);
  }

  private assertParams(url: string, waitSelector: string) {
    if (isFalsy(url)) {
      throw new RangeError("url cannot be null or empty");
    }

    if (isFalsy(waitSelector)) {
      throw new RangeError("waitSelector cannot be null or empty");
    }
  }

  async findText(selector: string): Promise<string> {
    const content = await this.nightmare.evaluate(
      selectText as any,
      selector as any
    );

    return content as string;
  }

  async destroy(): Promise<void> {
    await this.nightmare.end();
  }
}
