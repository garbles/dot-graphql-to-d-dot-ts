import { buildSchema } from "graphql";
import schemaToIR from "./schema-to-ir";
import irToSource from "./schema-ir-to-source";

export default (source: string) => {
  const schema = buildSchema(source);
  const ir = schemaToIR(schema);
  return irToSource(ir);
};
