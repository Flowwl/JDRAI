import { UsersService } from "@backend/modules";
import { BcryptService } from "@backend/externalModules";
import { Test, TestingModule } from "@backend/tests";
import { AppModule } from "@backend/app.module";
import {
  adminUser,
  adminUserWithPassword,
  simpleUser,
  simpleUserWithPassword
} from "@backend/modules/users/tests/mockedUsers";

describe('FindAllUsersLib', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });
  
    it("should find all users", async () => {
      await userService.create(simpleUserWithPassword);
      await userService.create(adminUserWithPassword);

      const res = await userService.findAll(["_id"]);

      expect(res).toEqual([{ _id: simpleUser._id }, { _id: adminUser._id }]);
    });
});
