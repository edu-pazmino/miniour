import { Container } from "inversify";
import { isFalsy } from "utility-types";
import { GenericModule } from "./generic.module.js";
import { App } from "./app.js";
import { CoreTypeModules } from "./types.module.js";

export class Engine {
  private modules: GenericModule[] = [];

  constructor(private container: Container) {
    this.container = new Container();
  }

  run() {
    this.initModules();
    const instances = this.container.getAll<App>(CoreTypeModules.Start);
    if (isFalsy(instances)) {
      throw new RangeError("Cannot find any starter program");
    }

    Promise.all(instances.map(async (i) => await i.start()));
  }

  private initModules() {
    if (isFalsy(this.modules)) {
      throw new RangeError("Cannot start app missing modules");
    }
    this.modules.forEach((m) => m.register(this.container));
  }

  async register(m: GenericModule | GenericModule[]) {
    if (isFalsy(m)) {
      throw new RangeError("Invalid module");
    }

    if (Array.isArray(m)) {
      this.modules = this.modules.concat(m);
    } else {
      this.modules.push(m);
    }
  }
}
