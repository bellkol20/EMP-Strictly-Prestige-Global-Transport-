import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getCompanyName } from './brand/brand';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (error: Error | null, allow?: boolean) => void,
    ) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      const allowed = (process.env.CORS_ORIGIN ?? '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);

      if (allowed.length === 0) {
        callback(null, true);
        return;
      }

      if (allowed.includes(origin)) {
        callback(null, true);
        return;
      }

      if (origin.endsWith('.vercel.app')) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
  });

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port, '0.0.0.0');
  // eslint-disable-next-line no-console
  console.log(`${getCompanyName()} API listening on ${port}`);
}
bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('API failed to start', error);
  process.exit(1);
});
