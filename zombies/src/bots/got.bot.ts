import type { GotBodyFn, GotInstance } from "got";
import got from "got";
import { CookieJar } from "tough-cookie";

export class GotBot {
  private client: GotInstance<GotBodyFn<any>>;

  constructor() {
    const cookieJar = new CookieJar();
    this.client = got.extend({ cookieJar });
  }

  async navigate(url: string) {
    const resp = await this.client.get(url);

    if (resp.statusCode !== 200) {
      throw new Error(`Invalid error code`);
    }

    return resp.body;
  }
}
