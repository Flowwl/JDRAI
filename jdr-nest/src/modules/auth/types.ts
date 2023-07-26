import { User } from "@backend/modules/users/schemas";
import { Request as ERequest, Response as EResponse } from "express";

export type UserJwtPayload = Pick<User, "_id" | "email">;
export type AuthedRequest = ERequest & {
  user: User
}
export type ExpressResponse = EResponse
export type ExpressRequest = ERequest
