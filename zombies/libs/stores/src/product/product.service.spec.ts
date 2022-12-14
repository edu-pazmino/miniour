import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { ProductEntity } from '../entities/product.entity';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let mockRepository = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    const repositoryMockProvide = getRepositoryToken(ProductEntity);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: repositoryMockProvide,
          useValue: mockRepository,
        },
        ProductService,
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('given a list of products save into database', (done) => {
    const products: ProductEntity[] = [
      new ProductEntity(),
      new ProductEntity(),
    ];
    const validProduct = new ProductEntity();
    validProduct.id = 1;
    const secondValidProduct = new ProductEntity();
    secondValidProduct.id = 2;
    mockRepository.save.mockReturnValue(
      new Promise((resolve) => resolve(validProduct)),
    );
    mockRepository.save.mockReturnValue(
      new Promise((resolve) => resolve(secondValidProduct)),
    );

    service.save(products).subscribe({
      next: (isCreated) => {
        expect(isCreated).toBe(true);
        expect(mockRepository.save).toHaveBeenCalledTimes(products.length);
        done();
      },
      error: (err) => done(err),
    });
  });
});
