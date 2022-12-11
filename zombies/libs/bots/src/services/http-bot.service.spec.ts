import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpBotService } from './http-bot.service';

const DEFAULT_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15';

type ProductItem = {
  brand: string;
};

describe('HttpBotService', () => {
  let service: HttpBotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          headers: {
            'User-Agent': DEFAULT_USER_AGENT,
          },
          withCredentials: true,
        }),
      ],
      providers: [HttpBotService],
    }).compile();

    service = module.get<HttpBotService>(HttpBotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('vsgamers_scraper_product_list', (done) => {
    const url = 'http://localhost:8080/vsgamers/product_list.html';
    const expectedValues = [
      { brand: 'Ozone' },
      { brand: 'Ozone' },
      { brand: 'Ozone' },
      { brand: 'Ozone' },
      { brand: 'Ozone' },
      { brand: 'Zowie by BenQ' },
      { brand: 'Acer' },
      { brand: 'Acer' },
      { brand: 'BenQ' },
      { brand: 'Acer' },
      { brand: 'Acer' },
      { brand: 'AOC' },
      { brand: 'AOC' },
      { brand: 'AOC' },
      { brand: 'MSI' },
      { brand: 'Asus' },
      { brand: 'Asus' },
      { brand: 'MSI' },
      { brand: 'Asus' },
      { brand: 'LG' },
      { brand: 'Asus' },
      { brand: 'Samsung' },
      { brand: 'BenQ' },
      { brand: 'BenQ' },
    ];

    service.navigate(url);
    service
      .findObject<ProductItem>('.vs-product-card', {
        brand: '.vs-product-card-detail-brand',
      })
      .subscribe({
        next: (result) => {
          expect(result).toHaveLength(expectedValues.length);
          for (const i in expectedValues) {
            expect(result[i].brand).toBe(expectedValues[i].brand);
          }
        },
        complete: () => done(),
      });
  });
});
