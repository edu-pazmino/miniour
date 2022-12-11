import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProductItem, ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getHello(): Observable<ProductItem[]> {
    return this.productsService.getHello();
  }
}
