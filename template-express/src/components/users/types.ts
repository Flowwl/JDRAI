import { ROLES } from "@/enums";
import { WithId } from "@/database/mongooseHelpers";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  email: string;
  password: string;
  isConfirmed: boolean;
  confirmationCode?: string | null;
  roleId: ROLES;
}



export interface UserQueries {
  byEmail(this: UserModel, email: string): ReturnType<UserModel["find"]>;
}

export interface UserMethods {
  getFirstPartOfEmail(email: string): string;
}

export type UserModel = Model<WithId<User>, UserQueries, UserMethods>
