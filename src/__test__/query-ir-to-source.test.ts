import fs from "fs";
import path from "path";
import queryToIR from "../query-to-ir";
import queryIRToSource from "../query-ir-to-source";

test("builds source from IR", async () => {
  const source = fs
    .readFileSync(path.join(__dirname, "./__data__/simple-query.graphql"))
    .toString();

  const result = queryIRToSource(queryToIR(source), "./simple-schema");

  // console.log(result);
});
