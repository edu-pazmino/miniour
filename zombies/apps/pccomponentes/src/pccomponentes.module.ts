import { BotsModule } from '@app/bots';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PccomponentesController } from './pccomponentes.controller';
import { PccomponentesService } from './pccomponentes.service';

@Module({
  imports: [
    BotsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'miniour',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [PccomponentesController],
  providers: [PccomponentesService],
})
export class PccomponentesModule {}
