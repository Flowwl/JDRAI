import { User } from "../schemas";
import mongoose from "mongoose";
import { Role } from "@backend/roles";
import * as _ from "lodash";

export const simpleUserWithPassword: User = {
  _id: new mongoose.Types.ObjectId(),
  roles: [Role.User],
  email: "simple.user@test.fr",
  password: "simplePassword",
  isConfirmed: true,
  confirmationCode: "toto",
  accessToken: ""
};

export const simpleUser = _.omit(simpleUserWithPassword, ["password"]);

export const adminUserWithPassword: User = {
  _id: new mongoose.Types.ObjectId(),
  roles: [Role.Admin],
  email: "admin.user@test.fr",
  password: "adminPassword",
  isConfirmed: true,
  confirmationCode: "toto",
  accessToken: ""
};

export const adminUser = _.omit(adminUserWithPassword, ["password"]);
