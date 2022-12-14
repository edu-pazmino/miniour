import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { concatMap, from, Observable, of, scan } from 'rxjs';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  save(products: ProductEntity[]): Observable<boolean> {
    return from(products).pipe(
      concatMap((p) => this.productRepository.save(p)),
      scan((acc, currentProduct) => acc && currentProduct.id > 0, true),
    );
  }
}
