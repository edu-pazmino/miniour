import { HttpBotService } from '@app/bots/services/http-bot.service';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';

export type ProductItem = {
  brand: string;
  category: string;
  name: string;
  price: string;
};

@Injectable()
export class ProductsService {
  constructor(private readonly productService: ProductsService) {}

  save(products: CreateProductDto[]): Observable<ProductItem[]> {
    return this.productService.save(products);
  }
}
