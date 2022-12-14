import { BrowserFactory } from '@app/bots/factories/browser-factory';
import { Injectable, Logger } from '@nestjs/common';
import Nightmare from 'nightmare';
import { PCCProductListItem } from './dtos/pcc-product-list-item';

@Injectable()
export class PccomponentesService {
  private browser: Nightmare;
  private logger = new Logger(PccomponentesService.name);

  constructor(browserFactory: BrowserFactory) {
    this.browser = browserFactory.getBrowser();
  }

  async getAllProductsFromList(url: string): Promise<PCCProductListItem[]> {
    await this.navitage(url, 'a[data-product-id]');
    let products: PCCProductListItem[] = [];

    do {
      products = [...products, ...(await this.getProducts())];
    } while (await this.nextPage());

    return products;
  }

  async navitage(url: string, waitSelector: string) {
    await this.browser.goto(url).wait(waitSelector);
  }

  async nextPage(): Promise<boolean> {
    const isHidden = await this.browser
      .evaluate(
        () =>
          window.getComputedStyle(
            document.querySelector('#paginator button:last-child'),
          ).visibility == 'hidden',
      )
      .then((x) => x as boolean);

    if (!isHidden) {
      this.logger.log('Navigating next page');
      await this.browser
        .click('#paginator button:last-child')
        .wait('a[data-product-id]');
    }

    return !isHidden;
  }

  private async getProducts(): Promise<PCCProductListItem[]> {
    return await this.browser
      .evaluate(() => {
        return Array.from(document.querySelectorAll('a[data-product-id]')).map(
          (x) => ({
            externalId: parseInt(x.getAttribute('data-product-id')),
            name: x.getAttribute('data-product-name'),
            price: parseFloat(x.getAttribute('data-product-price')),
            brand: x.getAttribute('data-product-brand'),
          }),
        );
      })
      .then((l) => l as Promise<PCCProductListItem[]>);
  }
}
