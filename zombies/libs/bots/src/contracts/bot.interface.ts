import { Observable } from 'rxjs';

export type SelectorObjectMapper<T> = {
  [P in keyof T]: string;
};

export interface Bot {
  navigate(url: string, waitSelector?: string);

  findText(selector: string): Observable<string>;

  findObject<T>(
    itemsSelector: string,
    selectorMapper: SelectorObjectMapper<T>,
  ): Observable<T[]>;

  destroy();
}
