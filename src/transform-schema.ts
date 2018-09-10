import { graphql, buildSchema, introspectionQuery } from "graphql";

export default (source: string) => {
  const schema = buildSchema(source);

  graphql(schema, introspectionQuery)
    .then(s => JSON.stringify(s, null, 2))
    .then(console.log)
    .catch(console.error);
};
