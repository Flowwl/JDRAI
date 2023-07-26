import { User } from '@/components/users';
import request from 'supertest';
import { app } from '@/app';
import { simpleUser } from '@/tests';
import { userService } from "@/components/users/service";
import { ObjectId } from "mongodb";

describe('POST api/auth/reset-password/:confirmationCode', function () {
  const registerUser = {
    ...simpleUser,
    _id: new ObjectId(),
    email: 'test@test.test',
    password: 'Test123*',
    firstname: 'test',
    lastname: 'test',
    isConfirmed: false
  } as User;
  const CONFIRMATION_CODE = "confirmationCodelezdfkeo";
  before(async () => {
    await userService.create({ ...registerUser, confirmationCode: CONFIRMATION_CODE });
  });
  after(async () => {
    await userService.deleteById(registerUser._id);
  });
  it('should return error http 404 if param is empty', async function () {
    await request(app)
      .post('/api/auth/reset-password/')
      .expect(404);
  });
  it('should return error http 404 if no use found with param', async function () {
    await request(app)
      .post(`/api/auth/reset-password/notFOundCode `)
      .send({ password: 'TESTtest1234+' })
      .expect(404);
  });

  it('should return http 400 when resetting email with no password provided', async function () {
    await request(app)
      .post(`/api/auth/reset-password/${CONFIRMATION_CODE}`)
      .expect(400);

  });
  it('should return http 400 when resetting email with invalid password provided', async function () {
    await request(app)
      .post(`/api/auth/reset-password/${CONFIRMATION_CODE}`)
      .send({ password: 'abc' })
      .expect(400);
  });
  it('should return http 400 when resetting email with invalid body', async function () {
    await request(app)
      .post(`/api/auth/reset-password/${CONFIRMATION_CODE}`)
      .send({ email: 'abc' })
      .expect(400);
  });

  it('should return http 200 when resetting password', async function () {
    await request(app)
      .post(`/api/auth/reset-password/${CONFIRMATION_CODE}`)
      .send({ password: 'TESTtest1234+' })
      .expect(200);
  });
});
