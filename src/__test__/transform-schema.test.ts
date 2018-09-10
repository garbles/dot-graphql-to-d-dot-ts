import fs from "fs";
import path from "path";
import transform from "../transform-schema";

test("builds a simple schema", () => {
  const source = fs.readFileSync(path.resolve("./__data__/simple.graphql"));

  console.log(source);
});
