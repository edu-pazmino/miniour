import { GotBot } from "./bots/got.bot";
(async () => {
    try {
        console.log("starting to become zombies");
        const bot = new GotBot();
        const body = await bot.navigate('https://www.logitechg.com/es-es/');
        console.log(body);
    }
    catch (ex) {
        console.error(ex);
    }
})();
//# sourceMappingURL=bootstrap.js.map