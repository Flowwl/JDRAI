import { initApp, Test } from "@backend/tests";
import { TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { UsersService } from "@backend/modules";
import { simpleUserWithPassword } from "@backend/modules/users/tests/mockedUsers";
import { AppModule } from "@backend/app.module";

describe("loginController", () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let userService: UsersService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
      controllers: []
    }).compile();

    userService = moduleRef.get<UsersService>(UsersService);
    
    app = await initApp(moduleRef)
  });

  it("should throw 404 if no user found with email", () => {
    return request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: "toto@test.fr",
        password: "titi"
      })
      .expect(404);
  });
  it("should throw 400 if a mail is not of format email", () => {
    return request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: "toto",
        password: "titi"
      })
      .expect(400);
  });
  it("should throw 400 if a field is missing", () => {
    return request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: "toto"
      })
      .expect(400);
  });

  it("should have logged in the user", async () => {
    await userService.create(simpleUserWithPassword)
    
    return request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: simpleUserWithPassword.email,
        password: simpleUserWithPassword.password
      })
      .expect(200)
      .expect((res) => !!res.get("access_token"))
  });
});
