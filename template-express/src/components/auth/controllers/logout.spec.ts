import { sandbox } from '@/tests';
import { httpErrorService, jwtService } from '@/services';
import request from 'supertest';
import { app } from '@/app';

describe('POST /api/auth/logout', () => {
  let clearTokenStub;
  beforeEach(() => {
    clearTokenStub = sandbox.stub(jwtService, 'clearToken')
      .throws(httpErrorService.badRequest());
  });
  it("should throw 400 if error", async () => {
    await request(app)
      .get('/api/auth/logout')
      .expect(400);
  });
});
