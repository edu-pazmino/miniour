import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BotsService } from './bots.service';
import { HttpBotService } from './services/http-bot.service';
const DEFAULT_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        'User-Agent': DEFAULT_USER_AGENT,
      },
      withCredentials: true,
    }),
  ],
  providers: [BotsService, HttpBotService],
  exports: [BotsService, HttpBotService],
})
export class BotsModule {}
