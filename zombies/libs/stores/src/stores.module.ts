import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { StoresService } from './stores.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [StoresService],
  exports: [StoresService],
})
export class StoresModule {}
