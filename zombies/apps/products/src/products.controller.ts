import { ProductEntity } from '@app/stores/entities/product.entity';
import { ProductService } from '@app/stores/product/product.service';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Post()
  save(@Body() products: CreateProductDto[]): Observable<boolean> {
    if (products.length < 0) {
      throw new BadRequestException('cannot be save zero elements');
    }

    return this.productsService.save(
      products.map((p) => {
        const product = new ProductEntity();

        product.name = p.name;
        product.coverUrl = p.coverUrl;
        product.externalId = p.externalId;
        product.price = p.price;
        product.url = p.url;

        return product;
      }),
    );
  }
}
