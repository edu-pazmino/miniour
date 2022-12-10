import "reflect-metadata";

import { Container } from "inversify";
import { ProductModule } from "./apps/products/product.module.js";
import { BotsModule } from "./bots/bots.module.js";
import { Engine } from "./core/engine.js";

(async () => {
  try {
    console.log("starting to become zombies");
    const container = new Container();

    const engine = new Engine(container);
    engine.register([new BotsModule(), new ProductModule()]);

    engine.run();
  } catch (ex) {
    console.error(ex);
  }
})();
