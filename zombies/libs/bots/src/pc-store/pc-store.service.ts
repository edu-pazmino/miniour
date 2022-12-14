import { Inject, Injectable } from '@nestjs/common';
import * as Nightmare from 'nightmare';
import { defer, from, Observable, of } from 'rxjs';
import { StoreCategory } from '../entities/store-category';
import { BrowserFactory } from '../factories/browser-factory';

@Injectable()
export class PcStoreService {
  private nightmare: Nightmare;
  private categoriesURL: string =
    'http://localhost:8080/pccomponentes/componentes_category.html';

  constructor(browserFactory: BrowserFactory) {
    this.nightmare = browserFactory.getBrowser();
  }

  getAllProducts(): Observable<StoreCategory[]> {
    // const promise: Promise<StoreCategory[]> = ;

    return defer(() =>
      this.nightmare
        .goto(this.categoriesURL)
        .wait('a[data-promotion-name]')
        .evaluate(() =>
          Array.from(document.querySelectorAll('a[data-promotion-name]')).map(
            (x) => ({
              name: x.getAttribute('data-promotion-name'),
              url: x.getAttribute('href'),
            }),
          ),
        )
        .then((list) => list as StoreCategory[]),
    );
  }
}
