'use strict';

import { userService } from "@/components/users";
import { projectConfig } from "@/config";
import { ROLES } from "@/enums";
import { ObjectId } from "mongodb";

const adminUser = {
  _id: new ObjectId(),
  email: projectConfig.APP_MAIN_ADMIN_EMAIL || "",
  password: projectConfig.APP_MAIN_ADMIN_PASSWORD || "",
  roleId: ROLES.ADMIN,
  isConfirmed: true
};

export async function up(next) {
  await userService.create(adminUser)
  next()
}

export async function down (next) {
  await userService.deleteById(adminUser._id)
  next()
}
