import got, { Got } from "got";
import { CookieJar } from "tough-cookie";
import { Bot } from "./bot.js";
import { CheerioAPI, load as loadPage } from "cheerio";
import { isFalsy } from "utility-types";

export class GotBot implements Bot {
  private client: Got;
  private currentPage: string;
  private querySelector: CheerioAPI;

  constructor() {
    const cookieJar = new CookieJar();
    this.client = got.extend({ cookieJar });
  }

  async navigate(url: string) {
    this.querySelector = null;

    const resp = await this.client.get(url);

    if (resp.statusCode !== 200) {
      throw new Error(`Invalid error code`);
    }

    this.currentPage = resp.body;
  }

  async findText(selector: string): Promise<string> {
    if (isFalsy(this.querySelector)) {
      this.querySelector = loadPage(this.currentPage);
    }

    const elem = this.querySelector(selector);

    return elem.first().text();
  }

  async destroy() {
    console.log("it's not necessary to do close");
  }
}
