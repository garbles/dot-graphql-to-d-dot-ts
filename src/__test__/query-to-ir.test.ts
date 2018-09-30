import fs from "fs";
import path from "path";
import queryToIR from "../query-to-ir";

test("builds an IR from a schema", () => {
  const source = fs
    .readFileSync(path.join(__dirname, "./__data__/simple-query.graphql"))
    .toString();

  const result = queryToIR(source);

  // console.log(JSON.stringify(result, null, 2));
});
