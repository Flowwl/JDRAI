import { login, simpleUser } from '@/tests';
import { request } from '@/tests/supertest';
import { app } from '@/app';
import { Request } from '@/types';

describe('GET /api/users/me', () => {
  let cookies: Request["cookies"];

  before(async () => {
    cookies = await login(simpleUser);
  });
  it('should return http 200 if trying to get himself ', async function () {
    await request(app)
      .get('/api/users/me')
      .set('Cookie', cookies)
      .expect(200);
  });
  it('should return http 403 if no user trying to get himself ', async function () {
    await request(app)
      .get('/api/users/me')
      .expect(403);
  });
});
