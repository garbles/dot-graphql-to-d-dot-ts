import fs from "fs";
import path from "path";
import schemaToIR from "../schema-to-ir";
import { buildSchema, parse } from "graphql";

test("builds an IR from a schema", async () => {
  const source = fs
    .readFileSync(path.join(__dirname, "./__data__/simple-schema.graphql"))
    .toString();

  const schema = buildSchema(source);
  const result = schemaToIR(schema);

  // console.log(JSON.stringify(result, null, 2));
});
