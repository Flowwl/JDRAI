import { Definition, ObjectId, SchemaOptions } from "@/database/mongooseHelpers";
import { ROLES } from "@/enums";
import mongoose, { Model } from "mongoose";
import { User, UserMethods, UserModel, UserQueries } from "./types";

const userSchemaOptions: SchemaOptions<User, UserMethods, UserQueries> = {
  methods: {
    getFirstPartOfEmail(email: string): string {
      return email.split("@")[0];
    }
  },
  query: {
    byEmail(this: UserModel, email: string) {
      return this.find({ email });
    }
  }
};

const userDefinition: Definition<User> = {
  _id: ObjectId,
  email: String,
  password: String,
  isConfirmed: Boolean,
  confirmationCode: {
    type: String,
    required: false
  },
  roleId: {
    type: Number,
    enum: ROLES
  }
};

export const userSchema = new mongoose.Schema<User, Model<User, UserQueries, UserQueries>, UserMethods>(userDefinition, userSchemaOptions);

//TODO
// userSchema.pre("save", async function (next) {
//   const user = this;
//   // @ts-expect-error
//   await mongoose.model(Models.user).service.findById(user._id);
//   next();
// });
