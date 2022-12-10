import { Container } from "inversify";

export type ModuleConfig<T> = {
  name: string;
  type: new (...args: never[]) => T;
};

export abstract class GenericModule {
  public modules: ModuleConfig<any>[];

  register(container: Container) {
    this.modules.forEach(({ name, type }) =>
      container.bind(name).to(type).inTransientScope()
    );
  }
}
