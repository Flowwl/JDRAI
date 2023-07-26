import { User } from '@/components/users';
import request from 'supertest';
import { app } from '@/app';
import { userService } from "@/components/users/service";

describe('POST api/auth/register', function () {
  const registerUser = {
    email: 'test@test.test',
    password: 'Test123*'
  } as User;
  after(async () => {
    await userService.deleteByEmail(registerUser.email);
  });
  it('should return error http 400 if no body provided', async function () {
    await request(app)
      .post('/api/auth/register')
      .expect(400);

  });

  it('should return error http 400 if body is invalid', async function () {
    await request(app)
      .post('/api/auth/register')
      .send({ test: 'bonjour' })
      .expect(400);
  });

  it('should return error http 400 if body is incomplete', async function () {
    await request(app)
      .post('/api/auth/register')
      .send({ email: registerUser.email })
      .expect(400);
  });

  it('should return error http 400 if body is valid but values are null', async function () {
    await request(app)
      .post('/api/auth/register')
      .send({ email: null, password: null, firstname: null, lastname: null })
      .expect(400);
  });

  it('should return error http 400 if body is valid but values are undefined', async function () {
    await request(app)
      .post('/api/auth/register')
      .send({ email: undefined, password: undefined, firstname: undefined, lastname: undefined })
      .expect(400);
  });

  it('should return error http 400 if body is partially valid', async function () {
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@test.fr', password: 'Test1234*', firstname: null, lastname: null })
      .expect(400);
  });

  it('should return http 200 if infos are valid', async function () {
    await request(app)
      .post('/api/auth/register')
      .send(registerUser)
      .expect(200);
  });

  it('should return error http 409 if email provided already in database', async function () {
    await request(app)
      .post('/api/auth/register')
      .send(registerUser)
      .expect(409);
  });
});
