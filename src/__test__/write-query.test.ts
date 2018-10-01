import writeQuery from "../write-query";

test("writes the query", () => {
  writeQuery(
    "src/__test__/__data__/simple-query.graphql",
    "src/__test__/__data__/simple-query.d.ts",
    "./simple-schema"
  );
});
