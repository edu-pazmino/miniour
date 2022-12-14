import { Test, TestingModule } from '@nestjs/testing';
import * as Nightmare from 'nightmare';
import { Observable } from 'rxjs';
import { StoreCategory } from '../entities/store-category';
import { BrowserFactory } from '../factories/browser-factory';
import { PcStoreService } from './pc-store.service';

describe('PcStoreService', () => {
  let service: PcStoreService;
  beforeAll(() => {
    jest.setTimeout(30000);
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrowserFactory, PcStoreService],
    }).compile();

    service = module.get<PcStoreService>(PcStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get all the all categories', () => {
    // const expectedResult: Array<StoreCategory> = [
    //   {
    //     name: 'Placas base',
    //     url: 'https://www.pccomponentes.com/placas-base',
    //   },
    //   {
    //     name: 'Procesadores',
    //     url: 'https://www.pccomponentes.com/procesadores',
    //   },
    //   {
    //     name: 'Discos duros',
    //     url: 'https://www.pccomponentes.com/discos-duros',
    //   },
    //   {
    //     name: 'SSD',
    //     url: 'https://www.pccomponentes.com/discos-duros-ssd',
    //   },
    //   {
    //     name: 'Tarjetas gráficas',
    //     url: 'https://www.pccomponentes.com/tarjetas-graficas',
    //   },
    //   {
    //     name: 'Memorias ram',
    //     url: 'https://www.pccomponentes.com/memorias-ram',
    //   },
    //   {
    //     name: 'Multilectores',
    //     url: 'https://www.pccomponentes.com/multilectores',
    //   },
    //   {
    //     name: 'Tarjetas de sonido',
    //     url: 'https://www.pccomponentes.com/tarjetas-sonido',
    //   },
    //   {
    //     name: 'Torres',
    //     url: 'https://www.pccomponentes.com/torres',
    //   },
    //   {
    //     name: 'Ventilación',
    //     url: 'https://www.pccomponentes.com/ventiladores',
    //   },
    //   {
    //     name: 'Fuentes de alimentación',
    //     url: 'https://www.pccomponentes.com/fuentes-alimentacion',
    //   },
    //   {
    //     name: 'Modding',
    //     url: 'https://www.pccomponentes.com/modding',
    //   },
    // ];
    // const obs: Observable<StoreCategory[]> = service.getAllProducts();

    // obs.subscribe({
    //   next: (categories) => {
    //     expect(expectedResult).toHaveLength(expectedResult.length);
    //     for (const categoryIdx in expectedResult) {
    //       const expectedCategory = expectedResult[categoryIdx];
    //       const category = categories[categoryIdx];

    //       expect(category.name).toBe(expectedCategory.name);
    //       expect(category.url).toBe(expectedCategory.url);
    //     }
    //   },
    //   complete: () => done(),
    // });
  });
});
