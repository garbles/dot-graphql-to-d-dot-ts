import fs from "fs";
import path from "path";
import transformQuery from "./transform-query";

export default (inputPath: string, outputPath: string, schemaPath: string) => {
  const inputFullPath = path.relative(process.cwd(), inputPath);
  const outputFullPath = path.relative(process.cwd(), outputPath);
  const source = fs.readFileSync(inputFullPath).toString();
  const result = transformQuery(source, schemaPath);
  fs.writeFileSync(outputFullPath, result);
};
