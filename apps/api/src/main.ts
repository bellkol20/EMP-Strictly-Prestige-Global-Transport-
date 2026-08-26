import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getCompanyName } from './brand/brand';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',').map((v) => v.trim()) ?? true,
  });

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`${getCompanyName()} API listening on ${port}`);
}
bootstrap();
