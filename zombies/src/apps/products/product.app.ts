import { inject, injectable } from "inversify";
import { GotBot } from "../../bots/got-bot.js";
import { Types } from "../../bots/types.js";
import { App } from "../../core/app.js";

@injectable()
export class ProductApp extends App {
  constructor(@inject(Types.got) private readonly bot: GotBot) {
    super();
  }

  public async start(): Promise<any> {
    try {
      const selector = "h2[data-name=main-title]";
      await this.bot.navigate("https://www.logitechg.com/es-es/");
      const content = await this.bot.findText(selector);

      console.log("content: %s", content);

      this.bot.destroy();
    } catch (ex) {
      console.log(ex);
    }
  }
}
