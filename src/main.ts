import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  await app.listen(3000);
  Logger.log(`Application running on port ${port}`); // 애플리케이션이 시작할 때 로그 남기기
}
bootstrap();
