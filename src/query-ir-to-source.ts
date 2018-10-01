import prettier from "prettier";
import { IR } from "./query-to-ir";

export default (irs: IR[], schemaPath: string): string => {
  const imports = [
    `import { DocumentNode } from 'graphql';`,
    `import { TypeUtils, Query } from ${JSON.stringify(schemaPath)};`
  ];

  const exports = irs.map(
    ir =>
      `
      export const MyQuery: DocumentNode; // graphql-tag
      export type ${ir.name}Result = TypeUtils.Resolve<Query, ${JSON.stringify(ir.selection)}>;`
  );

  const str = [...imports, ...exports].join("\n").replace(/\n\s+\n/g, "\n");

  return prettier.format(str, { parser: "typescript" });
};
