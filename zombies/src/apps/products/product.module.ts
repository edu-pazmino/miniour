import { ProductApp } from "./product.app.js";
import { GenericModule, ModuleConfig } from "../../core/generic.module.js";
import { CoreTypeModules } from "../../core/types.module.js";

export class ProductModule extends GenericModule {
  public modules: ModuleConfig<any>[] = [
    { type: ProductApp, name: CoreTypeModules.Start },
  ];
}
