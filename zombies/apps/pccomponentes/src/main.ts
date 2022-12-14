import { NestFactory } from '@nestjs/core';
import { PccomponentesModule } from './pccomponentes.module';

async function bootstrap() {
  const app = await NestFactory.create(PccomponentesModule);
  await app.listen(3000);
}
bootstrap();
