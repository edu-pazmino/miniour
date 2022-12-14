import { Controller, Get } from '@nestjs/common';
import { PCCProductListItem } from './dtos/pcc-product-list-item';
import { PccomponentesService } from './pccomponentes.service';

@Controller()
export class PccomponentesController {
  constructor(private readonly pccomponentesService: PccomponentesService) {}

  @Get()
  getProductList(url: string): Promise<PCCProductListItem[]> {
    return this.pccomponentesService.getAllProductsFromList(url);
  }
}
