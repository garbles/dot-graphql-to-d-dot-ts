import fs from "fs";
import path from "path";
import { buildSchema } from "graphql";
import schemaToIR from "./schema-to-ir";
import schemaIRToSource from "./schema-ir-to-source";

export default (inputPath: string, outputPath: string) => {
  const inputFullPath = path.relative(process.cwd(), inputPath);
  const outputFullPath = path.relative(process.cwd(), outputPath);

  const source = fs.readFileSync(inputFullPath).toString();
  const schema = buildSchema(source);
  const result = schemaIRToSource(schemaToIR(schema));

  fs.writeFileSync(outputFullPath, result);
};
