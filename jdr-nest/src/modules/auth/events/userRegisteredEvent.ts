import { Types } from "mongoose";
import { User } from "@backend/modules/users/schemas";

export class UserRegisteredEvent {
  _id: Types.ObjectId;
  email: User["email"];
  
  constructor(_id: Types.ObjectId, email: User["email"]) {
    this._id = _id;
    this.email = email
  }
}
