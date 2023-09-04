import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config(); 
  const app = await NestFactory.create(AppModule, {cors: true});
  await app.listen(process.env.PORT || 3001);
}
bootstrap();