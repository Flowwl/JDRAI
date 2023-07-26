import { login, sandbox, simpleUser } from '@/tests';
import { userService } from '@/components/users';
import { request } from '@/tests/supertest';
import { app } from '@/app';
import { Request } from '@/types';

describe('GET /api/users', () => {
  let cookies: Request["cookies"];
  let findAllStub;
  beforeEach(async () => {
    findAllStub = sandbox.stub(userService, 'findAndCountAll');
    cookies = await login(simpleUser);
  });
  it('should return error http 401 if simple user trying to get all users ', async function () {
    cookies = await login(simpleUser);
    await request(app)
      .get('/api/users')
      .set('Cookie', cookies)
      .expect(401);
  });
  it('should return error http 403 if simple user trying to get all users ', async function () {
    await request(app)
      .get('/api/users')
      .expect(403);
  });
});
