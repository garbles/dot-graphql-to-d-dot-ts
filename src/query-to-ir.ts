import { parse, OperationDefinitionNode, SelectionSetNode } from "graphql";

type IR = any;
type IRs = { [name: string]: IR };

const isOperationDefinitionNode = (obj: any): obj is OperationDefinitionNode =>
  obj.kind === "OperationDefinition";

const walkSelectionSet = (set: SelectionSetNode) =>
  set.selections.reduce((acc: any, selection: any) => {
    const fieldName: any = selection.name.value;
    const value: any = selection.selectionSet ? walkSelectionSet(selection.selectionSet) : true;

    return { ...acc, [fieldName]: value };
  }, {});

export default (source: string) => {
  const { definitions } = parse(source);

  for (const def of definitions) {
    if (isOperationDefinitionNode(def)) {
      // TODO: force name to be present
      const queryName = def.name ? def.name.value : "Query";
      const selection = walkSelectionSet(def.selectionSet);

      console.log(queryName);
      console.log(JSON.stringify(selection, null, 2));
      console.log("==================================");
      console.log("==================================");
      console.log("==================================");
      console.log("==================================");
    }
  }
};
