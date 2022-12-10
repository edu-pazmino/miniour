import { injectable } from "inversify";

@injectable()
export abstract class App {
  public abstract start(): Promise<any>;
}
