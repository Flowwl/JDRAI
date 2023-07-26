import { ContextIdFactory } from "@nestjs/core";
import { TestingModule } from "@nestjs/testing";
import { Request } from "express";
import { ObjectId } from "mongoose";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

export function buildMockedReq(moduleRef: TestingModule, req: Partial<Request>) {
  const contextId = ContextIdFactory.create();
  moduleRef.registerRequestByContextId(req, contextId);

  return req;
}

export async function initApp(moduleRef: TestingModule) {
  const app = moduleRef.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(cookieParser())
  await app.init();
  
  return app;
}
export function plainId(obj: { _id: ObjectId }) {
  return {
    ...obj,
    _id: obj._id.toString()
  };
}
