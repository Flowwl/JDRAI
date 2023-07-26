import { ObjectId } from "mongodb";
import { Transform, TransformFnParams } from "class-transformer";

export function ConvertToObjectId() {
  return Transform((params: TransformFnParams) => new ObjectId(params.value));
}

export function ConvertToBoolean() {
  return Transform((params: TransformFnParams) => params.value === "true");
}

export function ConvertToNumber() {
  return Transform((params: TransformFnParams) => parseInt(params.value, 10));
}
