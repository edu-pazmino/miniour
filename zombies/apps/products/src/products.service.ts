import { HttpBotService } from '@app/bots/services/http-bot.service';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

export type ProductItem = {
  brand: string;
  category: string;
  name: string;
  price: string;
};

@Injectable()
export class ProductsService {
  constructor(private readonly botService: HttpBotService) {}

  getHello(): Observable<ProductItem[]> {
    this.botService.navigate(
      'http://localhost:8080/vsgamers/product_list.html',
    );

    return this.botService.findObject<ProductItem>('.vs-product-card', {
      brand: '.vs-product-card-detail-brand',
      category: '.vs-product-card-detail-category',
      name: '.vs-product-card-title a',
      price: '.vs-product-card-prices-price',
    });
  }
}
