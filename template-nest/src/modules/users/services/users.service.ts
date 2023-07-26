import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schemas";
import { BcryptService } from "@backend/externalModules";
import { flattenBody, ObjectId, Projection, projectionToSelect } from "@backend/utils";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>, private bcryptService: BcryptService) {}

  async create(partialUser: Partial<User> & Pick<User, "password" | "email">) {
    const newUser = await this.userModel.create({
      ...partialUser,
      password: await this.bcryptService.encryptPassword(partialUser.password)
    });
    return !!newUser;
  }

  async existsByEmail(email: User["email"]) {
    return !!await this.userModel.exists({ email });
  }

  async findOneByEmail(email: User["email"], projection: Projection<User> = []) {
    const user = await this.userModel.findOne({ email }).select(projectionToSelect(projection)).exec();
    return user?.toObject();
  }

  async updateOneById(userId: ObjectId, updateBody: Partial<Omit<User, "_id">>) {
    return this.userModel.updateOne({ _id: userId }, { $set: flattenBody(updateBody) }).exec();
  }

  async findAll(projection: Projection<User> = []): Promise<User[]> {
    const users = await this.userModel.find().select(projectionToSelect(projection)).exec();
    return users.map((u) => u.toObject());
  };

  async deleteOneByEmail(email: User["email"]) {
    return this.userModel.deleteOne({ email });
  }
}
