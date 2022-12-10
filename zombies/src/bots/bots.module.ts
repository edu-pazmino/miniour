import { GenericModule, ModuleConfig } from "../core/generic.module.js";
import { GotBot } from "./got-bot.js";
import { NightmareBot } from "./nightmare-bot.js";
import { Types } from "./types.js";

export class BotsModule extends GenericModule {
  public modules: ModuleConfig<any>[] = [
    { type: GotBot, name: Types.got },
    { type: NightmareBot, name: Types.nightmare },
  ];
}
