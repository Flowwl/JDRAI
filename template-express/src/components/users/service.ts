import { User } from "./types";
import { ObjectId } from "mongodb";
import { Collections } from "@/database/collections";
import { userSchema } from "@/components/users/schema";
import { createModel } from "@/utils/mongoose";
import { Models } from "@/database/models";

class UserService {
  private model = createModel(Models.user, this, userSchema, Collections.users);

  async create(newUser: User): Promise<User> {
    const user = new this.model(newUser);
    const savedUser = await user.save();
    return savedUser.toObject();
  }

  async findById(userId: ObjectId): Promise<User | null> {
    return this.model.findById(userId);
  }

  async findAll(): Promise<User[]> {
    return this.model.find();
  }

  async findAndCountAll(offset = 0, limit = 100) {
    const users = this.model.find().skip(offset).limit(100);
    const count = this.model.countDocuments();

    return { users, count };
  }

  async update(newUser: Partial<User>, userId: ObjectId) {
    return this.model.updateOne({ _id: userId }, { $set: { ...newUser } });
  }

  async findUserByEmail(email: string) {
    return this.model.findOne({ email });
  }

  async findUserByConfirmationCode(confirmationCode: string): Promise<User | null> {
    return this.model.findOne({ confirmationCode: confirmationCode });
  }

  deleteById(userId: ObjectId) {
    return this.model.deleteOne({ _id: userId });
  }

  deleteByEmail(email: string) {
    return this.model.deleteOne({ email: email });
  }
}

export const userService = new UserService();
