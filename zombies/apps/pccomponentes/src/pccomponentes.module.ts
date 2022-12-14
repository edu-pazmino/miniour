import { BotsModule } from '@app/bots';
import { Module } from '@nestjs/common';
import { PccomponentesController } from './pccomponentes.controller';
import { PccomponentesService } from './pccomponentes.service';

@Module({
  imports: [BotsModule],
  controllers: [PccomponentesController],
  providers: [PccomponentesService],
})
export class PccomponentesModule {}
