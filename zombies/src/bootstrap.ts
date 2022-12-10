import { GotBot } from "./bots/got-bot.js";

(async () => {
  try {
    console.log("starting to become zombies");

    const bot = new GotBot();
    const selector = "h2[data-name=main-title]";
    await bot.navigate("https://www.logitechg.com/es-es/");
    const content = await bot.findText(selector);

    console.log(content);
    await bot.destroy();
  } catch (ex) {
    console.error(ex);
  }
})();
