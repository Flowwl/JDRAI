import * as mongoose from "mongoose";
import { CompileModelOptions, Schema } from "mongoose";
import { Models } from "@/database/models";


export function createModel<T, Service, U, TQueryHelpers = {}>(
  name: string,
  service: Service,
  schema?: Schema<T, any, TQueryHelpers>,
  collection?: string,
  options?: CompileModelOptions
):  mongoose.Model<T, TQueryHelpers, {}, {}, Schema<T, any, TQueryHelpers>> & { service: Service } {
  const newModel = mongoose.model(name, schema, collection, options)
  // @ts-expect-error
  newModel.service = service
  // @ts-expect-error
  return newModel
}


export function getModel<Model, Service>(modelName: Models[keyof Models]): Model & { service: Service } {
  return mongoose.model(modelName as string) as unknown as Model & { service: Service }
}
