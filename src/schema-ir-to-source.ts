import prettier from "prettier";
import { IR } from "./schema-to-ir";

const typeUtils = `
namespace TypeUtils {
  type Unwrap<T> = { [K in keyof T]: T[K] extends {} ? Unwrap<T[K]> : T[K] };

  type WalkA<T, O> = T extends null ? never : { [KK in keyof T & keyof O]: WalkB<T[KK], O[KK]> };

  type WalkB<T, O> = 
      O extends true ? T :
      T extends null ? T extends (null | infer N) ? WalkA<N, O> | null :
      WalkA<T, O> : WalkA<T, O>;

  export type Resolve<T, O> = Unwrap<WalkA<T, O>>;
}
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

  const str = [typeUtils, ...arr]
    .map(v => `export ${v}`)
    .join("\n")
    .replace(/\n\s+\n/g, "\n");

  return prettier.format(str, { parser: "typescript" });
};
