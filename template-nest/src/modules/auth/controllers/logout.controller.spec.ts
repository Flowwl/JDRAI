import { initApp, Test } from "@backend/tests";
import { TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AuthService, UsersService } from "@backend/modules";
import { AppModule } from "@backend/app.module";
import { simpleUserWithPassword } from "@backend/modules/users/tests/mockedUsers";

describe("logoutController", () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let userService: UsersService;
  let authService: AuthService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
      controllers: []
    }).compile();

    userService = moduleRef.get<UsersService>(UsersService);
    authService = moduleRef.get(AuthService);
    
    app = await initApp(moduleRef)
  });
  
  it("should have loggedOut the user", async () => {
    await userService.create(simpleUserWithPassword)
    const { access_token } = await authService.login(simpleUserWithPassword.email, simpleUserWithPassword.password);
    
    return request(app.getHttpServer())
      .get("/auth/logout")
      .set("Cookie", [`token=${access_token}`])
      .expect(200)
  });
});
