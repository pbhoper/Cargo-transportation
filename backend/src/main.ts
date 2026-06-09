import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const options = {
  origin: ['http://localhost:5173', 'http://localhost', 'http://localhost:80'],
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Accept',
    'Origin',
    'Authorization',
    'X-Requested-With',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(options);
  await app.listen(3000);
}
bootstrap();
