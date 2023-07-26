import { adminUser, login, resetUsers, simpleUser } from '@/tests';
import { request } from '@/tests/supertest';
import { app } from '@/app';
import { Request } from '@/types';

describe('PUT /api/users/me', () => {
  let cookies: Request["cookies"];

  before(async () => {
    cookies = await login(simpleUser);
  });
  after(() => {
    resetUsers();
  });
  it('should return http 200 if trying to update himself ', async function () {
    await request(app)
      .put('/api/users/me')
      .set('Cookie', cookies)
      .send({ email: simpleUser.email })
      .expect(200);
  });
  it('should return http 409 if trying to update himself with existant email', async function () {
    await request(app)
      .put('/api/users/me')
      .set('Cookie', cookies)
      .send({ email: adminUser.email })
      .expect(409);
  });
  it('should return http 400 if trying to update himself with empty body', async function () {
    await request(app)
      .put('/api/users/me')
      .set('Cookie', cookies)
      .expect(400);
  });
  it('should return http 400 if trying to update himself with null values', async function () {
    await request(app)
      .put('/api/users/me')
      .set('Cookie', cookies)
      .send({ firstname: null })
      .expect(400);
  });
  it('should return http 400 if trying to update himself with bad values', async function () {
    await request(app)
      .put('/api/users/me')
      .set('Cookie', cookies)
      .send({ toto: 'toto' })
      .expect(400);
  });
  it('should return http 400 if trying to update himself with unauthorized values', async function () {
    await request(app)
      .put('/api/users/me')
      .set('Cookie', cookies)
      .send({ password: 'TEsttest123+' })
      .expect(400);
  });
  it('should return http 403 if no user trying to update himself ', async function () {
    await request(app)
      .put('/api/users/me')
      .send({ firstname: 'toto' })
      .expect(403);
  });
});
