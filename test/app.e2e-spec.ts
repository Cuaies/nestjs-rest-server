import { TestingModule, Test } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AppModule } from '../src/app/app.module';
import { GeneralExceptionsFilter } from '../src/core/filters';
import { setBaseUrl } from 'pactum/src/exports/request';
import { PrismaService } from '../src/shared/prisma/prisma.service';
import { spec } from 'pactum';
import { seedData } from '../prisma/seedData';
import { LoginDTO, RegisterDTO } from '../src/app/modules/auth/dto';

describe('App (e2e)', () => {
  const PORT = 3005;

  let app: INestApplication;
  let prismaService: PrismaService;
  let httpAdapter: HttpAdapterHost;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    prismaService = app.get(PrismaService);
    httpAdapter = app.get(HttpAdapterHost);

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.useGlobalFilters(new GeneralExceptionsFilter(httpAdapter));

    await app.init();
    await app.listen(PORT);

    await prismaService.cleanDb();

    setBaseUrl(`http://localhost:${PORT}`);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth', () => {
    describe('/register', () => {
      const DTO: RegisterDTO = {
        email: 'test@test.com',
        password: 'password',
        name: 'test',
      };

      beforeEach(async () => {
        await prismaService.cleanDb();
      });

      test('should throw if no body is provided', async () => {
        return spec()
          .post('/auth/register')
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      test('should throw if no email is provided', async () => {
        return spec()
          .post('/auth/register')
          .withBody({ ...DTO, email: undefined })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      test('should throw if no password is provided', async () => {
        return spec()
          .post('/auth/register')
          .withBody({ ...DTO, password: undefined })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      test('should throw if email already exists', async () => {
        await prismaService.user.create({ data: DTO });

        return spec()
          .post('/auth/register')
          .withBody({ ...DTO })
          .expectStatus(HttpStatus.CONFLICT);
      });

      test('should register if no name is provided', async () => {
        return spec()
          .post('/auth/register')
          .withBody({ ...DTO, name: undefined })
          .expectStatus(HttpStatus.CREATED);
      });

      test('should register if name is provided', async () => {
        return spec()
          .post('/auth/register')
          .withBody({ ...DTO })
          .expectStatus(HttpStatus.CREATED);
      });
    });

    describe('/login', () => {
      const DTO: LoginDTO = seedData.users[0];

      beforeAll(async () => {
        await prismaService.cleanDb();
        await prismaService.seedDatabase(seedData);
      });

      test('should throw if no body is provided', async () => {
        return spec().post('/auth/login').expectStatus(HttpStatus.BAD_REQUEST);
      });

      test('should throw if no email is provided', async () => {
        return spec()
          .post('/auth/login')
          .withBody({ ...DTO, email: undefined })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      test('should throw if no password is provided', async () => {
        return spec()
          .post('/auth/login')
          .withBody({ ...DTO, password: undefined })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      test('should throw if email does not exist', async () => {
        return spec()
          .post('/auth/login')
          .withBody({ ...DTO, email: 'invalid@test.com' })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      test("should throw if password doesn't match", async () => {
        return spec()
          .post('/auth/login')
          .withBody({ ...DTO, password: 'invalid' })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      test('should login', () => {
        return spec()
          .post('/auth/login')
          .withBody({ ...DTO })
          .expectStatus(HttpStatus.OK)
          .stores('access_token', 'access_token');
      });
    });
  });

  test.todo('Bills');

  test.todo('Invoices');
});
