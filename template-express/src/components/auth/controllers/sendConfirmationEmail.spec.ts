import { User } from '@/components/users';
import request from 'supertest';
import { app } from '@/app';
import { simpleUser } from '@/tests';
import { ObjectId } from "mongodb";
import { userService } from "@/components/users/service";

const registerUser = {
  ...simpleUser,
  _id: new ObjectId(),
  email: 'test@test.test',
  password: 'Test123*',
  isConfirmed: false
} as User;

describe('POST api/auth/send-confirm-email', function () {
  before(async () => {
    await userService.create(registerUser);
  });
  after(async () => {
    await userService.deleteById(registerUser._id);
  });
  it('should return error http 400 if body empty', async function () {
    await request(app)
      .post('/api/auth/send-confirm-email')
      .expect(400);
  });
  it('should return error http 400 if body provided invalid', async function () {
    await request(app)
      .post('/api/auth/send-confirm-email')
      .send({ password: 'test' })
      .expect(400);
  });
  it('should return error http 400 if user with email not found', async function () {
    await request(app)
      .post('/api/auth/send-confirm-email')
      .send({ email: 'notExistanMail@test.fr' })
      .expect(404);
  });
  it('should return http 200 if body provided', async function () {
    await request(app)
      .post('/api/auth/send-confirm-email')
      .send({ email: registerUser.email })
      .expect(200);
  });
});
