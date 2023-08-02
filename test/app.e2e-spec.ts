import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token = '';
  let emailTest = 'sofia@test1.ru';
  let newProductId;
  let newCartId;
  let userId;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /reg', () => {
    return request(app.getHttpServer())
      .post('/reg')
      .send({
        firstName: 'Софи',
        middleName: 'Владимировна',
        lastName: 'Ходырева',
        email: emailTest,
        password: '12345',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            firstName: 'Софи',
            middleName: 'Владимировна',
            lastName: 'Ходырева',
            email: emailTest,
            password: expect.any(String),
          }),
        );
      });
  });

  it('POST/auth', () => {
    return request(app.getHttpServer())
      .post('/auth')
      .send({
        email: emailTest,
        password: '12345',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            access_token: expect.any(String),
          }),
        );
      })
      .then((res) => {
        token = res.body.access_token;
        userId = res.body.id;
      });
  });

  // customers
  it('PATCH /customers/13', () => {
    return request(app.getHttpServer())
      .patch('/customers/13')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        isAdmin: false,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            isAdmin: false,
            id: 13,
            middleName: null,
          }),
        );
      });
  });

  it('GET /customers', () => {
    return request(app.getHttpServer())
      .get('/customers')
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            {
              id: 13,
              firstName: 'Софи',
              middleName: null,
              lastName: 'Ходырева',
              isAdmin: false,
              email: 'sofia1@hjqy.ru',
              password: expect.any(String),
              cart: null,
              orders: [],
            },
          ]),
        );
      });
  });

  it('GET /customers/13', () => {
    return request(app.getHttpServer())
      .get('/customers/13')
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: 13,
            firstName: 'Софи',
            middleName: null,
            lastName: 'Ходырева',
            isAdmin: false,
            email: 'sofia1@hjqy.ru',
            password: expect.any(String),
            cart: null,
            orders: [],
          }),
        );
      });
  });

  it('PATCH /customers/13', () => {
    return request(app.getHttpServer())
      .patch('/customers/13')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        isAdmin: true,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            isAdmin: true,
            id: 13,
            middleName: null,
          }),
        );
      });
  });

  it('GET /customers/13', () => {
    return request(app.getHttpServer())
      .get('/customers/13')
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: 13,
            firstName: 'Софи',
            middleName: null,
            lastName: 'Ходырева',
            isAdmin: true,
            email: 'sofia1@hjqy.ru',
            password: expect.any(String),
            cart: null,
            orders: [],
          }),
        );
      });
  });

  // products
  it('POST /products', () => {
    return request(app.getHttpServer())
      .post('/products')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        title: 'test',
        description: 'test',
        img: 'test',
        size: 'S',
        sex: 'U',
        color: 'white',
        price: '3500',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            title: 'test',
            description: 'test',
            img: 'test',
            size: 'S',
            sex: 'U',
            color: 'white',
            price: '3500',
            id: expect.any(Number),
          }),
        );
      })
      .then((res) => {
        newProductId = res.body.id;
      });
  });

  // it('GET /products', () => {
  //   return request(app.getHttpServer())
  //     .get('/products')
  //     .set({ Authorization: `Bearer ${token}` })
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body).toContainEqual({
  //         title: 'test',
  //         description: 'test',
  //         img: 'test',
  //         size: 'S',
  //         sex: 'U',
  //         color: 'white',
  //         price: '3500',
  //         id: expect.any(Number),
  //       });
  //     });
  // });

  it('GET /products/newProductId', () => {
    return request(app.getHttpServer())
      .get(`/products/${newProductId}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            title: 'test',
            description: 'test',
            img: 'test',
            size: 'S',
            sex: 'U',
            color: 'white',
            price: 3500,
            id: expect.any(Number),
          }),
        );
      });
  });

  it('PATCH /products/newProductId', () => {
    return request(app.getHttpServer())
      .patch(`/products/${newProductId}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({
        title: 'test1',
        description: 'test1',
        img: 'test1',
        size: 'S',
        sex: 'U',
        color: 'white',
        price: 2700,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            title: 'test1',
            description: 'test1',
            img: 'test1',
            size: 'S',
            sex: 'U',
            color: 'white',
            price: 2700,
            id: expect.any(Number),
          }),
        );
      });
  });

  it('GET /products/newProductId', () => {
    return request(app.getHttpServer())
      .get(`/products/${newProductId}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            title: 'test1',
            description: 'test1',
            img: 'test1',
            size: 'S',
            sex: 'U',
            color: 'white',
            price: 2700,
            id: expect.any(Number),
          }),
        );
      });
  });

  // carts

  it('POST /carts', () => {
    return request(app.getHttpServer())
      .post('/carts')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        customer: userId,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            customer: userId,
            id: expect.any(Number),
            price: 0,
          }),
        );
      })
      .then((res) => {
        newCartId = res.body.id;
      });
  });

  // it('GET /carts', () => {
  //   return request(app.getHttpServer())
  //     .get('/carts')
  //     .set({ Authorization: `Bearer ${token}` })
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body).toEqual(
  //         expect.arrayContaining([
  //           {
  //             id: 3,
  //             price: 0,
  //             products: [],
  //           },
  //         ]),
  //       );
  //     });
  // });

  it('GET /carts/newCartId', () => {
    return request(app.getHttpServer())
      .get(`/carts/${newCartId}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: newCartId,
            price: 0,
            products: [],
          }),
        );
      });
  });

  it('PATCH /carts/newCartId', () => {
    return request(app.getHttpServer())
      .patch(`/carts/${newCartId}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({
        price: 0,
        products: [],
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            price: 0,
            id: newCartId,
            products: [],
          }),
        );
      });
  });

  it('GET /carts/newCartId', () => {
    return request(app.getHttpServer())
      .get(`/carts/${newCartId}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: newCartId,
            price: 0,
            products: [],
          }),
        );
      });
  });

  it('POST /carts/add', () => {
    return request(app.getHttpServer())
      .post('/carts/add')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        productId: newProductId,
        cartId: newCartId,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: newCartId,
            price: 2700,
            products: [
              {
                id: newProductId,
                title: 'test1',
                description: 'test1',
                img: 'test1',
                sex: 'U',
                size: 'S',
                color: 'white',
                price: 2700,
              },
            ],
          }),
        );
      });
  });

  it('DELETE /carts/newCartId', () => {
    return request(app.getHttpServer())
      .delete(`/carts/${newCartId}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({});
      });
  });

  it('DELETE /products/newProductId', () => {
    return request(app.getHttpServer())
      .delete(`/products/${newProductId}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({});
      });
  });

  it('DELETE /customers/userId', () => {
    return request(app.getHttpServer())
      .delete(`/customers/${userId}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({});
      });
  });

  afterAll((done) => {
    app.close();
    done();
  });
});
