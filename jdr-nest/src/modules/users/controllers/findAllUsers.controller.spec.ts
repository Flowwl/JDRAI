import { UsersService } from "../services";
import { adminUser, adminUserWithPassword, simpleUser, simpleUserWithPassword } from "../tests/mockedUsers";
import { DatabaseModule } from "@backend/database";
import { UsersModule } from "../users.module";
import { initApp, plainId, Test } from "@backend/tests";
import { TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "@backend/app.module";
import { AuthService } from "@backend/modules";

describe("FindAllUsersController", () => {
  let usersService: UsersService;
  let authService: AuthService;
  let moduleRef: TestingModule;
  let app: INestApplication;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule, UsersModule, AppModule],
      providers: [],
      controllers: []
    }).compile();

    app = await initApp(moduleRef);

    usersService = moduleRef.get(UsersService);
    authService = moduleRef.get(AuthService);
  });

  it("should return an array of users", async () => {
    await usersService.create(simpleUserWithPassword);
    await usersService.create(adminUserWithPassword);
    const { access_token } = await authService.login(adminUserWithPassword.email, adminUserWithPassword.password);

    return request(app.getHttpServer())
      .get("/users/")
      .set("Cookie", [`token=${access_token}`])
      .expect(200)
      .expect([{ _id: plainId(simpleUser)._id, email: simpleUser.email }, { _id: plainId(adminUser)._id, email: adminUser.email }]);
  });

    it("should return 401 if nobody is logged", async () => {
      return request(app.getHttpServer())
        .get("/users/")
        .expect(401);
    });

    it("should return 403 if logged user is not an admin", async () => {
      await usersService.create(simpleUserWithPassword);
      const { access_token } = await authService.login(simpleUserWithPassword.email, simpleUserWithPassword.password);

      return request(app.getHttpServer())
        .get("/users/")
        .set("Cookie", [`token=${access_token}`])
        .expect(403);
    });
  });
