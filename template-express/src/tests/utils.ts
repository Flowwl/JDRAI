import { request } from './supertest';
import { app } from '@/app';
import { ROLES } from '@/enums';
import { bcryptService } from '@/services';
import { User } from '@/components/users';
import { Response } from 'supertest';
import { ObjectId } from "mongodb";
import { userService } from "@/components/users/service";
import { connectToDb } from "@/database/init";

const simpleUser: User = {
  _id: new ObjectId(),
  email: 'simple.user@example.com',
  password: 'simpleUser123*',
  isConfirmed: true,
  roleId: ROLES.USER
};
const adminUser: User = {
  _id: new ObjectId(),
  email: 'admin.user@example.com',
  password: 'adminUser123*',
  isConfirmed: true,
  roleId: ROLES.ADMIN
};

function getCookies(res: Response) {
  const setCookie = res.headers['set-cookie'];
  return setCookie ? setCookie[0]?.split(',').map((item) => item.split(';')[0]).join(';') : '';
}

async function login(user: User) {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: user.email, password: user.password })
    .expect(200);

  return getCookies(res);
}

async function logout(cookies: ReturnType<typeof getCookies>) {
  await request(app)
    .get('/api/auth/logout')
    .set('Cookie', cookies)
    .expect(200);
}

async function resetUsers() {
  await userService.update({ ...adminUser, password: bcryptService.encryptPassword(adminUser.password) }, adminUser._id);
  await userService.update({ ...simpleUser, password: bcryptService.encryptPassword(simpleUser.password) }, simpleUser._id);
}

before(async () => {
  await connectToDb()
  await userService.create({ ...adminUser, password: bcryptService.encryptPassword(adminUser.password) });
  await userService.create({ ...simpleUser, password: bcryptService.encryptPassword(simpleUser.password) });
});
after(async () => {
  await userService.deleteByEmail(adminUser.email);
  await userService.deleteByEmail(simpleUser.email);
});

export {
  simpleUser,
  adminUser,
  resetUsers,
  login,
  logout
};
