import { Request } from '@/types';
import { login, request, resetUsers, simpleUser } from '@/tests';
import { app } from '@/app';

describe('PUT /api/users/:id', () => {
  let cookies: Request["cookies"];

  before(async () => {
    cookies = await login(simpleUser);
  });
  after(() => {
    resetUsers();
  });
  it('should return error http 401 if simple user trying to update an user with id ', async function () {
    await request(app)
      .put('/api/users/1')
      .set('Cookie', cookies)
      .expect(401);
  });
  it('should return error http 403 if simple user trying to update an user with id ', async function () {
    await request(app)
      .put('/api/users/1')
      .expect(403);
  });
});
