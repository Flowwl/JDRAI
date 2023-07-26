import { User } from '@/components/users';
import { expect } from '@/tests';
import { ObjectId } from "mongodb";
import { userService } from "@/components/users/service";

describe('service/user', () => {
  const confirmationCode = "test"
  const exampleUser: User = {
    _id: new ObjectId(),
    email: "user@example.fr",
    password: "blabla",
    roleId: 1,
    confirmationCode: confirmationCode,
    isConfirmed: true
  };

  describe('create', () => {
    after(async () => {
      await userService.deleteById(exampleUser._id);
    });
    it("should create new user", async () => {
      const user = await userService.create(exampleUser);

      expect(user._id).to.equal(exampleUser._id);
    });
  });
  describe('findAll', () => {
    before(async () => {
      await userService.create(exampleUser);
    });
    after(async () => {
      await userService.deleteById(exampleUser._id);
    });
    it("should return users", async () => {
      const users = await userService.findAll();

      expect(users.map((user) => user._id)).to.be.instanceOf(Array);
    });
  });
  describe('findId', () => {
    before(async () => {
      await userService.create(exampleUser);
    });
    after(async () => {
      await userService.deleteById(exampleUser._id);
    });
    it("should return user by id", async () => {
      const user = await userService.findById(exampleUser._id);

      expect(user?._id).to.contain(exampleUser._id);
    });
  });
  describe('findByEmail', () => {
    before(async () => {
      await userService.create(exampleUser);
    });
    after(async () => {
      await userService.deleteById(exampleUser._id);
    });
    it("should return user by email", async () => {
      const user = await userService.findUserByEmail(exampleUser.email);

      expect(user?._id).to.contain(exampleUser._id);
    });
  });
  describe('findByConfirmationCode', () => {
    before(async () => {
      await userService.create(exampleUser);
    });
    after(async () => {
      await userService.deleteById(exampleUser._id);
    });
    it("should return user by confirmation code", async () => {
      const user = await userService.findUserByConfirmationCode(confirmationCode);

      expect(user?._id).to.contain(exampleUser._id);
    });
  });
});
