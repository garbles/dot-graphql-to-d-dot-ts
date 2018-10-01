import { TypeUtils, Query } from "./simple-schema";
export type MyQueryResult = TypeUtils.Resolve<
  Query,
  { me: { id: true; email: true; age: true; cat: { meow: true } } }
>;
