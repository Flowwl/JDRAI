import { User, userService } from '@/components/users';
import { bcryptService, httpErrorService } from '@/services';
import { expect, login, sandbox, simpleUser } from '@/tests';
import request from 'supertest';
import { app } from '@/app';
import { ObjectId } from "mongodb";

describe('POST api/auth/confirmationCode', function () {
  const registerUser = {
    ...simpleUser,
    _id: new ObjectId(),
    email: 'test@test.test',
    password: 'Test123*',
    isConfirmed: false
  } as User;

  let cookies;
  before(async () => {
    await userService.create({
      ...registerUser,
      password: bcryptService.encryptPassword(registerUser.password),
      isConfirmed: true
    });
    cookies = await login(registerUser);
  });
  after(async () => {
    await userService.deleteById(registerUser._id);
  });

  it('should return 200 if confirmation is success', async function () {
    await request(app)
      .get('/api/auth/confirmationCode')
      .set("Cookie", cookies)
      .expect(200);

    const user = await userService.findById(registerUser._id);
    expect(user?.confirmationCode).not.to.be.null;
  });
  it('should return error http 400 if no user found', async function () {
    sandbox.stub(userService, 'update')
      .throws(httpErrorService.badRequest());
    await request(app)
      .get('/api/auth/confirmationCode')
      .set("Cookie", cookies)
      .expect(400);

  });
  it('should return error http 403 if no user in request', async function () {
    await request(app)
      .get('/api/auth/confirmationCode')
      .expect(403);
  });
});
