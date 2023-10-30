import { TestingModule, Test } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AppModule } from '../src/app/app.module';
import { GeneralExceptionsFilter } from '../src/core/filters';
import { setBaseUrl } from 'pactum/src/exports/request';
import { spec } from 'pactum';
import { seedData } from '../prisma/seedData';
import { LoginDTO, RegisterDTO } from '../src/app/modules/auth/dto';
import { TestIds } from '../src/ts/enums/testIds.enum';

describe('App (e2e)', () => {
  const PORT = 3005;

  let app: INestApplication;
  let httpAdapter: HttpAdapterHost;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

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

  describe('/auth', () => {
    describe('/register', () => {
      const DTO: RegisterDTO = {
        email: 'test@test.com',
        password: 'password',
        name: 'test',
      };

      const DTO2: RegisterDTO = {
        email: 'test2@test.com',
        password: 'password',
      };

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

      test('should register if no name is provided', async () => {
        return spec()
          .post('/auth/register')
          .withBody({ ...DTO, name: undefined })
          .expectStatus(HttpStatus.CREATED);
      });

      test('should register if name is provided', async () => {
        return spec()
          .post('/auth/register')
          .withBody({ ...DTO2 })
          .expectStatus(HttpStatus.CREATED);
      });

      test('should throw if email already exists', async () => {
        return spec()
          .post('/auth/register')
          .withBody({ ...DTO })
          .expectStatus(HttpStatus.CONFLICT);
      });
    });

    describe('/login', () => {
      const DTO: LoginDTO = seedData.users[0];

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

  describe('/bills', () => {
    describe('/', () => {
      test('should throw if there is no current user', () => {
        return spec().get('/bills').expectStatus(HttpStatus.UNAUTHORIZED);
      });

      test('should return the resources', () => {
        return spec()
          .get('/bills')
          .withHeaders({
            Authorization: `Bearer $S{access_token}`,
          })
          .expectStatus(HttpStatus.OK);
      });
    });

    describe('/:id', () => {
      describe('GET', () => {
        test('should throw if there is no current user', () => {
          return spec()
            .get(`/bills/${TestIds.EXISTENT}`)
            .expectStatus(HttpStatus.UNAUTHORIZED);
        });

        test('should throw if the resource does not exist', () => {
          return spec()
            .get(`/bills/${TestIds.NON_EXISTENT}`)
            .withHeaders({
              Authorization: `Bearer $S{access_token}`,
            })
            .expectStatus(HttpStatus.NOT_FOUND);
        });

        test('should throw if the resource does not belong to the user', () => {
          return spec()
            .get(`/bills/${TestIds.FOREIGN}`)
            .withHeaders({
              Authorization: `Bearer $S{access_token}`,
            })
            .expectStatus(HttpStatus.NOT_FOUND);
        });

        test('should return the resource', () => {
          return spec()
            .get(`/bills/${TestIds.EXISTENT}`)
            .withHeaders({
              Authorization: `Bearer $S{access_token}`,
            })
            .expectStatus(HttpStatus.OK);
        });
      });

      describe('DELETE', () => {
        test('should throw if there is no current user', () => {
          return spec()
            .delete(`/bills/${TestIds.EXISTENT}`)
            .expectStatus(HttpStatus.UNAUTHORIZED);
        });

        test('should throw if the resource does not exist', () => {
          return spec()
            .delete(`/bills/${TestIds.NON_EXISTENT}`)
            .withHeaders({
              Authorization: `Bearer $S{access_token}`,
            })
            .expectStatus(HttpStatus.NOT_FOUND);
        });

        test('should throw if the resource does not belong to the user', () => {
          return spec()
            .delete(`/bills/${TestIds.FOREIGN}`)
            .withHeaders({
              Authorization: `Bearer $S{access_token}`,
            })
            .expectStatus(HttpStatus.NOT_FOUND);
        });

        test('should delete the resource', () => {
          return spec()
            .delete(`/bills/${TestIds.EXISTENT}`)
            .withHeaders({
              Authorization: `Bearer $S{access_token}`,
            })
            .expectStatus(HttpStatus.OK);
        });
      });
    });
  });

  describe('/invoices', () => {
    describe('/', () => {
      test('should throw if there is no current user', () => {
        return spec().get('/invoices').expectStatus(HttpStatus.UNAUTHORIZED);
      });

      test('should return the resources', () => {
        return spec()
          .get('/invoices')
          .withHeaders({
            Authorization: `Bearer $S{access_token}`,
          })
          .expectStatus(HttpStatus.OK);
      });
    });

    describe('/:id', () => {
      describe('GET', () => {
        test('should throw if there is no current user', () => {
          return spec()
            .get(`/invoices/${TestIds.EXISTENT}`)
            .expectStatus(HttpStatus.UNAUTHORIZED);
        });

        test('should throw if the resource does not exist', () => {
          return spec()
            .get(`/invoices/${TestIds.NON_EXISTENT}`)
            .withHeaders({
              Authorization: `Bearer $S{access_token}`,
            })
            .expectStatus(HttpStatus.NOT_FOUND);
        });

        test('should throw if the resource does not belong to the user', () => {
          return spec()
            .get(`/invoices/${TestIds.FOREIGN}`)
            .withHeaders({
              Authorization: `Bearer $S{access_token}`,
            })
            .expectStatus(HttpStatus.NOT_FOUND);
        });

        test('should return the resource', () => {
          return spec()
            .get(`/invoices/${TestIds.EXISTENT}`)
            .withHeaders({
              Authorization: `Bearer $S{access_token}`,
            })
            .expectStatus(HttpStatus.OK);
        });
      });

      describe('DELETE', () => {
        test('should throw if there is no current user', () => {
          return spec()
            .delete(`/invoices/${TestIds.EXISTENT}`)
            .expectStatus(HttpStatus.UNAUTHORIZED);
        });

        test('should throw if the resource does not exist', () => {
          return spec()
            .delete(`/invoices/${TestIds.NON_EXISTENT}`)
            .withHeaders({
              Authorization: `Bearer $S{access_token}`,
            })
            .expectStatus(HttpStatus.NOT_FOUND);
        });

        test('should throw if the resource does not belong to the user', () => {
          return spec()
            .delete(`/invoices/${TestIds.FOREIGN}`)
            .withHeaders({
              Authorization: `Bearer $S{access_token}`,
            })
            .expectStatus(HttpStatus.NOT_FOUND);
        });

        test('should delete the resource', () => {
          return spec()
            .delete(`/invoices/${TestIds.EXISTENT}`)
            .withHeaders({
              Authorization: `Bearer $S{access_token}`,
            })
            .expectStatus(HttpStatus.OK);
        });
      });
    });
  });
});
