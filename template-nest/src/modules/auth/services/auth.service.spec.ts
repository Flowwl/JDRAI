import { Test, TestingModule } from "@backend/tests";
import { AuthService, UsersService } from "@backend/modules";
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException } from "@nestjs/common";
import { simpleUserWithPassword } from "@backend/modules/users/tests/mockedUsers";
import { AppModule } from "@backend/app.module";

describe("AuthService", () => {
  let authService: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;
  let module: TestingModule;
  
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe("login", () => {
    it("should login if login are correct", async () => {
      await userService.create(simpleUserWithPassword)
      
      const res = await authService.login(simpleUserWithPassword.email, simpleUserWithPassword.password);

      const updatedUser = await userService.findOneByEmail(simpleUserWithPassword.email)
      expect(res.access_token).not.toBeNull();
      expect(res).toEqual({ access_token: updatedUser.accessToken });
    });

    it("should throw if password mismatch", async () => {
      await userService.create(simpleUserWithPassword)

      const failingPromise = authService.login(simpleUserWithPassword.email, "toto");

      await expect(failingPromise).rejects.toThrow(UnauthorizedException);
    });
  });

  describe("logout", () => {
    it("should have unset the accessToken", async () => {
      await userService.create(simpleUserWithPassword)

      await authService.logout(simpleUserWithPassword._id);

      const updatedUser = await userService.findOneByEmail(simpleUserWithPassword.email)
      expect(updatedUser.accessToken).toBeNull();
    });
  });
  
  describe("register", () => {
    it("should register the user", async () => {
      await authService.register(simpleUserWithPassword.email, simpleUserWithPassword.password);

      const doesExists = await userService.existsByEmail(simpleUserWithPassword.email)
      expect(doesExists).toEqual(true);
    });
  });
});
