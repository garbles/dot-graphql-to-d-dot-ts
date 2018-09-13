import fs from "fs";
import path from "path";
import schemaToIR from "../schema-to-ir";
import { buildSchema } from "graphql";

test("builds a simple schema", async () => {
  const source = fs.readFileSync(path.join(__dirname, "./__data__/simple.graphql")).toString();
  const schema = buildSchema(source);

  const result = schemaToIR(schema);

  console.log(result);
});
