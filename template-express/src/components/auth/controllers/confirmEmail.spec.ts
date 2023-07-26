import { User } from '@/components/users';
import request from 'supertest';
import { app } from '@/app';
import { simpleUser } from '@/tests';
import { userService } from "@/components/users/service";
import { ObjectId } from "mongodb";

const registerUser = {
  ...simpleUser,
  _id: new ObjectId(),
  email: 'test@test.test',
  password: 'Test123*',
  isConfirmed: false
} as User;

describe('POST api/auth/confirm-email/:confirmationCode', function () {
  const CONFIRMATION_CODE = "confirmationCodelezdfkeo";
  before(async () => {
    await userService.create({ ...registerUser, confirmationCode: CONFIRMATION_CODE });
  });
  after(async () => {
    await userService.deleteById(registerUser._id);
  });
  it('should return error http 404 if param is empty', async function () {
    await request(app)
      .post('/api/auth/confirm-email/')
      .expect(404);
  });
  it('should return error http 404 if param is invalid', async function () {
    await request(app)
      .post('/api/auth/confirm-email/blablalba')
      .expect(404);
  });
  it('should return http 200 when confirming email', async function () {
    await request(app)
      .post(`/api/auth/confirm-email/${CONFIRMATION_CODE}`)
      .expect(200);
  });
});
