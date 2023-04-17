import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FakerService } from './faker/faker.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  await app.get(FakerService).seedDataBase(500);
  await app.close();
}
bootstrap();
