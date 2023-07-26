import { NextFunction as ENext, Request as EReq, Response as ERes } from 'express';
import { User } from "@/components/users/types";
import { WithId } from "@/database/mongooseHelpers";

type Request = EReq
type Response = ERes
type NextFunction = ENext

export type MulterFile<T extends string> = {
  fieldname: T;
  buffer: Buffer;
  originalname: string;
  mimetype: string;
  size: number;
}
type MulterRequest<T extends string> = Request & {
  files?: MulterFile<T>[]
  file: MulterFile<T>
}

type AuthedRequest = Request & {
  user: WithId<User>
}

export {
  AuthedRequest,
  Request,
  MulterRequest,
  Response,
  NextFunction
};
