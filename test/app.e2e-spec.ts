import { TestingModule, Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AppModule } from '../src/app/app.module';
import { GeneralExceptionsFilter } from '../src/core/filters';
import { setBaseUrl } from 'pactum/src/exports/request';
// import { PrismaService } from '../src/shared/prisma/prisma.service';

describe('App (e2e)', () => {
  const PORT = 3005;

  let app: INestApplication;
  // TODO:
  // let prismaService: PrismaService;
  let httpAdapter: HttpAdapterHost;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // TODO:
    // prismaService = app.get(PrismaService);
    httpAdapter = app.get(HttpAdapterHost);

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.useGlobalFilters(new GeneralExceptionsFilter(httpAdapter));

    await app.init();
    await app.listen(PORT);

    setBaseUrl(`http://localhost:${PORT}`);
  });

  afterAll(async () => {
    await app.close();
  });

  test.todo('Auth');

  test.todo('Bills');

  test.todo('Invoices');
});
