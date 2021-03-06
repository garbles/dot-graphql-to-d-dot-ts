import fs from "fs";
import path from "path";
import transformSchema from "./transform-schema";

export default (inputPath: string, outputPath: string) => {
  const inputFullPath = path.relative(process.cwd(), inputPath);
  const outputFullPath = path.relative(process.cwd(), outputPath);
  const source = fs.readFileSync(inputFullPath).toString();
  const result = transformSchema(source);
  fs.writeFileSync(outputFullPath, result);
};
