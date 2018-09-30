import fs from "fs";
import path from "path";
import { buildSchema } from "graphql";
import schemaToIR from "../schema-to-ir";
import schemaIRToSource from "../schema-ir-to-source";

test("builds source from IR", async () => {
  const source = fs
    .readFileSync(path.join(__dirname, "./__data__/simple-schema.graphql"))
    .toString();

  const schema = buildSchema(source);
  const result = schemaIRToSource(schemaToIR(schema));

  // console.log(result);
});
