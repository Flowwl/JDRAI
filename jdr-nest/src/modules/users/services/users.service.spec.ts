import { Test, TestingModule } from "@backend/tests";
import { UsersService } from "./users.service";
import { adminUser, adminUserWithPassword, simpleUser, simpleUserWithPassword } from "../tests/mockedUsers";
import * as _ from "lodash";
import mongoose from "mongoose";
import { BcryptService } from "@backend/externalModules";
import { AppModule } from "@backend/app.module";

describe("UsersService", () => {
  let userService: UsersService;
  let bcryptService: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    userService = module.get<UsersService>(UsersService);
    bcryptService = module.get<BcryptService>(BcryptService);
  });

  describe("create", () => {
    it("should return true if the user is create", async () => {
      const res = await userService.create(simpleUserWithPassword);

      expect(res).toEqual(true);
    });

    it("should create user with defaults", async () => {
      await userService.create(_.omit(simpleUserWithPassword, ["isConfirmed", "roles"]));

      const user = await userService.findOneByEmail(simpleUserWithPassword.email, ["_id", "email", "isConfirmed", "confirmationCode", "roles"]);
      expect(user).toEqual({
        ..._.omit(simpleUserWithPassword, "password", "accessToken"),
        isConfirmed: false,
        roles: ["user"]
      });
    });

    it("should throw if user is incomplete", async () => {
      const failingPromise = userService.create({
        ..._.omit(simpleUserWithPassword, ["password", "email"]),
        password: ""
      });

      await expect(failingPromise).rejects.toThrow(mongoose.Error.ValidationError);
    });
  });


  describe("existsByEmail", () => {
    it("should return true if user exists", async () => {
      await userService.create(simpleUserWithPassword);

      const res = await userService.existsByEmail(simpleUserWithPassword.email);

      expect(res).toEqual(true);
    });

    it("should return false if user does not exist", async () => {
      const res = await userService.existsByEmail(simpleUserWithPassword.email);
      
      expect(res).toEqual(false);
    });
  });
  
  describe("findOneByEmail", () => {
    it("should find a user", async () => {
      await userService.create(simpleUserWithPassword);

      const res = await userService.findOneByEmail(simpleUserWithPassword.email, ["_id", "email", "roles", "isConfirmed", "confirmationCode", "accessToken"]);

      expect(res).toEqual(simpleUser);
    });

    it("should find a user with password if specified", async () => {
      await userService.create(simpleUserWithPassword);

      const res = await userService.findOneByEmail(simpleUserWithPassword.email, ["_id", "email", "password", "roles", "isConfirmed", "confirmationCode", "accessToken"]);

      expect(res).toEqual({ ...simpleUserWithPassword, password: res.password });
      expect(await bcryptService.comparePasswords(simpleUserWithPassword.password, res.password)).toEqual(true);
    });
  });

  describe("updateOneByEmail", () => {
    it("should update a user", async () => {
      await userService.create(simpleUserWithPassword);

      await userService.updateOneById(simpleUserWithPassword._id, { isConfirmed: false });

      const updatedUser = await userService.findOneByEmail(simpleUserWithPassword.email, ["_id", "email", "isConfirmed"]);
      expect(updatedUser).toEqual({ 
        _id: simpleUserWithPassword._id,
        email: simpleUserWithPassword.email,
        isConfirmed: false
      });
    });
  });

  describe("findAll", () => {
    it("should find all users", async () => {
      await userService.create(simpleUserWithPassword);
      await userService.create(adminUserWithPassword);

      const res = await userService.findAll(["_id"]);

      expect(res).toEqual([{ _id: simpleUser._id }, { _id: adminUser._id }]);
    });
  });

  describe("deleteOneByEmail", () => {
    it("should have deleted the user", async () => {
      await userService.create(simpleUserWithPassword);

      await userService.deleteOneByEmail(simpleUser.email);

      const userExists = await userService.existsByEmail(simpleUser.email);
      expect(userExists).toEqual(false);
    });
  });


});
