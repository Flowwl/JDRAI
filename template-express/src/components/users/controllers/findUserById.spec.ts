import { login, simpleUser } from '@/tests';
import { request } from '@/tests/supertest';
import { app } from '@/app';
import { Request } from '@/types';

describe('GET /api/users/:id', () => {
  let cookies: Request["cookies"];

  before(async () => {
    cookies = await login(simpleUser);
  });
  it('should return error http 401 if simple user trying to get an user with id ', async function () {
    cookies = await login(simpleUser);
    await request(app)
      .get('/api/users/1')
      .set('Cookie', cookies)
      .expect(401);
  });
  it('should return error http 403 if simple user trying to get an user with id ', async function () {
    await request(app)
      .get('/api/users/1')
      .expect(403);
  });
});
