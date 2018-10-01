import { DocumentNode } from "graphql";
import { TypeUtils, Query } from "./simple-schema";

export const MyQuery: DocumentNode; // graphql-tag
export type MyQueryResult = TypeUtils.Resolve<
  Query,
  { me: { id: true; email: true; age: true; cat: { meow: true } } }
>;
