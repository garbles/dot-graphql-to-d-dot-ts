import prettier from "prettier";
import { IR } from "./schema-to-ir";

const queryResolverTypes = `
type ResolveQueryValueType<T, O> = O extends true ? T : ResolveQueryType<T, O>;

export type ResolveQueryType<T, O, K extends keyof T & keyof O = keyof T & keyof O> = {
  [KK in K]: ResolveQueryValueType<T[KK], O[KK]>
};
`;

export default (irs: IR[]): string => {
  let arr = [];

  for (let ir of irs) {
    switch (ir.type) {
      case "object":
        arr.push(`
          interface ${ir.name} {
            __typename: ${ir.name};
            ${ir.keyValues
              .map(kv => {
                let { key, value, isList, isListOfNullables, isNullable } = kv;

                if (isListOfNullables) {
                  value = `(${value} | null)[]`;
                } else if (isList) {
                  value = `${value}[]`;
                }

                if (isNullable) {
                  value = `${value} | null`;
                }

                return `${key}: ${value};`;
              })
              .join("\n")}
          }
        `);
        break;
      case "scalar":
        arr.push(`type ${ir.name} = ${ir.value};`);
        break;
      case "union":
        arr.push(`type ${ir.name} = ${ir.values.join(" | ")};`);
        break;
      case "enum":
        arr.push(`type ${ir.name} = ${ir.values.map(v => JSON.stringify(v)).join(" | ")};`);
    }
  }

  const str = arr
    .map(v => `export ${v}`)
    .join("\n")
    .replace(/\n\s+\n/g, "\n");

  return prettier.format(str, { parser: "typescript" });
};
