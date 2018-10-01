import queryToIR from "./query-to-ir";
import irToSource from "./query-ir-to-source";

export default (source: string, schemaPath: string) => {
  const ir = queryToIR(source);
  return irToSource(ir, schemaPath);
};
