import { parse, OperationDefinitionNode, SelectionSetNode } from "graphql";

export type IR = {
  name: string;
  selection: {};
};

const isOperationDefinitionNode = (obj: any): obj is OperationDefinitionNode =>
  obj.kind === "OperationDefinition";

const walkSelectionSet = (set: SelectionSetNode) =>
  set.selections.reduce((acc: any, selection: any) => {
    const fieldName: any = selection.name.value;
    const value: any = selection.selectionSet ? walkSelectionSet(selection.selectionSet) : true;

    return { ...acc, [fieldName]: value };
  }, {});

export default (source: string): IR[] => {
  const { definitions } = parse(source);
  const irs: IR[] = [];

  for (const def of definitions) {
    if (isOperationDefinitionNode(def)) {
      // TODO: force name to be present
      const name = def.name ? def.name.value : "Query";
      const selection = walkSelectionSet(def.selectionSet);

      irs.push({ name, selection });
    }
  }

  return irs;
};
