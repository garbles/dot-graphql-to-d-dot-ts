import {
  getNullableType,
  getNamedType,
  isScalarType,
  isObjectType,
  GraphQLField,
  GraphQLInputField,
  GraphQLList,
  GraphQLSchema,
  isNonNullType,
  isListType,
  isEnumType,
  isUnionType,
  isInterfaceType,
  isInputObjectType
} from "graphql";
import _ from "lodash";

const internalKinds = [
  "__Schema",
  "__Type",
  "__TypeKind",
  "__Field",
  "__InputValue",
  "__EnumValue",
  "__Directive",
  "__DirectiveLocation"
];

const isInternalKind = (str: string) => internalKinds.includes(str);

const getScalarValue = (str: string) => {
  switch (str) {
    case "String":
    case "ID":
      return "string";
    case "Int":
    case "Float":
      return "number";
    case "Boolean":
      return "boolean";
    default:
      // TODO: fix
      return "any";
  }
};

type ScalarIR = {
  type: "scalar";
  name: string;
  value: string;
};

type ObjectKeyValueIR = {
  key: string;
  value: string;
  isNullable: boolean;
  isList: boolean;
  isListOfNullables: boolean;
};

type ObjectIR = {
  type: "object";
  name: string;
  keyValues: ObjectKeyValueIR[];
};

type EnumIR = {
  type: "enum";
  name: string;
  values: string[];
};

type UnionIR = {
  type: "union";
  name: string;
  values: string[];
};

type IR = ScalarIR | ObjectIR | EnumIR | UnionIR;
type IRs = { [name: string]: IR };

export default (schema: GraphQLSchema): IRs => {
  const typeMap = schema.getTypeMap();
  const entries = Object.values(typeMap).filter(type => !isInternalKind(type.name));
  const irs: IRs = {};

  for (const type of entries) {
    if (isScalarType(type)) {
      const ir: ScalarIR = {
        type: "scalar",
        name: type.name,
        value: getScalarValue(type.name)
      };

      irs[type.name] = ir;
      continue;
    }

    if (isObjectType(type) || isInputObjectType(type)) {
      const ir: ObjectIR = {
        type: "object",
        name: type.name,
        keyValues: []
      };

      const fields = Object.values(type.getFields()) as (
        | GraphQLField<any, any>
        | GraphQLInputField)[];

      for (let field of fields) {
        const fieldType = field.type;
        const name = field.name;
        const namedType = getNamedType(fieldType);

        const isNullable = !isNonNullType(fieldType);
        const isList = isListType(getNullableType(fieldType));
        const isListOfNullables =
          isList && !isNonNullType((getNullableType(fieldType) as GraphQLList<any>).ofType);

        const keyValueIr: ObjectKeyValueIR = {
          key: name,
          value: namedType.name,
          isNullable,
          isList,
          isListOfNullables
        };

        ir.keyValues.push(keyValueIr);
      }

      irs[type.name] = ir;
      continue;
    }

    if (isEnumType(type)) {
      const ir: EnumIR = {
        type: "enum",
        name: type.name,
        values: type.getValues().map(v => v.value)
      };

      irs[type.name] = ir;
      continue;
    }

    if (isUnionType(type)) {
      const ir: UnionIR = {
        type: "union",
        name: type.name,
        values: type.getTypes().map(t => t.name)
      };

      irs[type.name] = ir;
      continue;
    }

    if (isInterfaceType(type)) {
      // ignore interfaces
      continue;
    }
  }

  return irs;
};
