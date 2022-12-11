import { BotsModule } from '@app/bots';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [BotsModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
