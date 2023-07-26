import { SchemaDefinition, SchemaDefinitionType, SchemaOptions as MSchemaOptions } from "mongoose";
import { ObjectId } from "mongodb";

export { ObjectId } from "mongodb"

export type Definition<T> = SchemaDefinition<SchemaDefinitionType<T>>


export interface SchemaOptions<Interface, Methods, Queries = {}> extends MSchemaOptions<"type", Interface, Methods, Queries> {
  methods: Methods
  query: Queries
}
// export class Schema<Interface, Methods, Queries> extends MSchema<Interface, Model<Interface, Queries, Methods>, Methods, Queries>{
//   constructor(definition?: SchemaDefinition<SchemaDefinitionType<Interface>>, options?: SchemaOptions<Interface, Methods, Queries>);
//   methods: Methods;
//   query: Queries;
//   obj: any//SchemaDefinition<SchemaDefinitionType<Interface>>;
// }
//
//
// export type Query<Interface, Queries, Methods = unknown> = MQuery<Interface, HydratedDocument<Interface, Methods>, Queries> & Queries;
// export type QueryResult<Interface, Queries, Methods> = QueryWithHelpers<HydratedDocument<Interface, Queries>[], Interface, Methods, HydratedDocument<Interface, Queries>>

export type WithId<T> = T & {
  _id: ObjectId
}
