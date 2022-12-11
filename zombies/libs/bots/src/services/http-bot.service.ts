import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { load as loadPage, CheerioAPI } from 'cheerio';
import { map, Observable, takeLast } from 'rxjs';
import { Bot, SelectorObjectMapper } from '../contracts/bot.interface';

type HttpCurrentPage = {
  html: string;
  querySelector: CheerioAPI;
};

@Injectable()
export class HttpBotService implements Bot {
  private currentPage: Observable<HttpCurrentPage>;
  private readonly logger = new Logger(HttpBotService.name);

  constructor(private readonly httpService: HttpService) {}

  findObject<T>(
    itemSelector: string,
    selectorMapper: SelectorObjectMapper<T>,
  ): Observable<T[]> {
    return this.currentPage.pipe(
      takeLast(1),
      map(({ querySelector: $ }) =>
        $(itemSelector)
          .map((_, el) => {
            const values = {};

            for (const [prop, selector] of Object.entries(selectorMapper)) {
              values[prop] = $(el)
                .find(selector as string)
                .text()
                .trim();
            }

            return values as T;
          })
          .get(),
      ),
    );
  }

  async navigate(url: string, waitSelector?: string): Promise<void> {
    this.currentPage = this.httpService.get<string>(url).pipe(
      map(({ data: html }) => ({
        html,
        querySelector: loadPage(html),
      })),
    );
  }

  findText(selector: string): Observable<string> {
    return this.currentPage.pipe(
      takeLast(1),
      map((page) => page.querySelector(selector).first().text().trim()),
    );
  }

  destroy() {
    this.logger.warn('It is not necessary to call destroy function ');
  }
}
