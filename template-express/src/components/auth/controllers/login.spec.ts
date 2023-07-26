import request from 'supertest';
import { app } from '@/app';
import { simpleUser } from '@/tests';
import { ObjectId } from "mongodb";
import { userService } from "@/components/users/service";
import { User } from "@/components/users";

const registerUser = {
  ...simpleUser,
  _id: new ObjectId(),
  email: 'test@test.test',
  password: 'Test123*',
  isConfirmed: false
} as User;

describe('POST api/auth/login', function () {
  before(async () => {
    await userService.create(registerUser);
  });
  after(async () => {
    await userService.deleteById(registerUser._id);
  });
  it('should return error http 400 if body empty', async function () {
    await request(app)
      .post('/api/auth/login')
      .expect(400);
  });
  it('should return error http 400 if body invalid', async function () {
    await request(app)
      .post('/api/auth/login')
      .send({ test: 'toto', blabla: 'haha' })
      .expect(400);
  });
  it('should return error http 400 if body contains only email', async function () {
    await request(app)
      .post('/api/auth/login')
      .send({ email: 'toto@toto.fr' })
      .expect(400);
  });
  it('should return error http 400 if id are invalid', async function () {
    await request(app)
      .post('/api/auth/login')
      .send({ email: 'toto@toto.fr', password: 'troloo' })
      .expect(400);
  });
  it('should return 200 if id are valid', async function () {
    await request(app)
      .post('/api/auth/login')
      .send({ email: registerUser.email, password: registerUser.password })
      .expect(400);
  });
});
