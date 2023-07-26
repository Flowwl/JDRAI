import { User } from '@/components/users';
import request from 'supertest';
import { app } from '@/app';
import { simpleUser } from '@/tests';
import { ObjectId } from "mongodb";
import { userService } from "@/components/users/service";

describe('POST api/auth/forgot-password', function () {
  const registerUser = {
    ...simpleUser,
    _id: new ObjectId(),
    email: 'test@test.test',
    password: 'Test123*',
    isConfirmed: false
  } as User;

  const CONFIRMATION_CODE = "confirmationCodelezdfkeo";
  before(async () => {
    await userService.create({ ...registerUser, confirmationCode: CONFIRMATION_CODE });
  });
  after(async () => {
    await userService.deleteById(registerUser._id);
  });
  it('should return error http 400 if body empty', async function () {
    await request(app)
      .post('/api/auth/forgot-password')
      .expect(400);
  });
  it('should return error http 400 if body provided invalid', async function () {
    await request(app)
      .post('/api/auth/forgot-password')
      .send({ password: 'test' })
      .expect(400);
  });
  it('should return error http 400 if user with email not found', async function () {
    await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: 'notExistanMail@test.fr' })
      .expect(404);
  });
  it('should return http 200 if body provided', async function () {
    await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: registerUser.email })
      .expect(200);
  });
});
