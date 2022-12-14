import { BotsModule } from '@app/bots';
import { BrowserFactory } from '@app/bots/factories/browser-factory';
import { Test, TestingModule } from '@nestjs/testing';
import { PccomponentesController } from './pccomponentes.controller';
import { PccomponentesService } from './pccomponentes.service';

describe('PccomponentesController', () => {
  // jest.setTimeout(600000);
  let controller: PccomponentesController;
  let factory: BrowserFactory;

  afterAll(async () => {
    // jest.setTimeout(5000);
    // await factory.end();
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [BotsModule],
      controllers: [PccomponentesController],
      providers: [PccomponentesService],
    }).compile();

    controller = app.get<PccomponentesController>(PccomponentesController);
    factory = app.get<BrowserFactory>(BrowserFactory);
  });

  describe('root', () => {
    test('get list of items', () => {
      expect(controller).toBeDefined();
      // const url = 'https://www.pccomponentes.com/tarjetas-graficas';
      // const list = await controller.getProductList(url);
      // expect(list.length).toBeGreaterThan(0);
    });
  });
});
