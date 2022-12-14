import { ProductService } from '@app/stores/product/product.service';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsController } from './products.controller';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let mockProductService = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ProductsController],
      providers: [{ provide: ProductService, useValue: mockProductService }],
    }).compile();

    productsController = app.get<ProductsController>(ProductsController);
  });

  describe('root', () => {
    it("doesn't call save service given an invalid products", () => {
      try {
        productsController.save([]);
      } catch (ex) {
        expect(ex).toBeInstanceOf(BadRequestException);
        expect(mockProductService.save).toHaveBeenCalledTimes(0);
      }
    });

    it("doesn't call save service given an invlaid product createdto", () => {
      try {
        productsController.save([new CreateProductDto()]);
      } catch (ex) {
        expect(ex).toBeInstanceOf(BadRequestException);
        expect(mockProductService.save).toHaveBeenCalledTimes(0);
      }
    });

    it('call save service given and valid products', (done) => {
      mockProductService.save.mockReturnValue(of(true));

      const dto = new CreateProductDto();
      dto.coverUrl = 'coverUrl';
      dto.externalId = 'exteralId';
      dto.name = 'name';
      dto.price = 50.0;
      dto.url = 'url';

      productsController.save([dto]).subscribe({
        next: (saved) => {
          expect(saved).toBeTruthy();
          expect(mockProductService.save).toHaveBeenCalled();
          done();
        },
        error: (err) => {
          done(err);
        },
      });
    });
  });
});
