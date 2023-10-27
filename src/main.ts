import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app/modules/app.module';
import { GeneralExceptionsFilter } from './core/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new GeneralExceptionsFilter(httpAdapter));

  await app.listen(3001);
}
bootstrap();
