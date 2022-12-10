export interface Bot {
  navigate(url: string, waitSelector?: string): Promise<void>;

  findText(selector: string): Promise<string>;

  destroy(): Promise<void>;
}
