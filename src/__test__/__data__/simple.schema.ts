// prettier-ignore
type ResolveQueryValueType<T, O> = O extends true ? T : ResolveQueryType<T, O>;

type ResolveQueryType<T, O, K extends keyof T & keyof O = keyof T & keyof O> = {
  [KK in K]: ResolveQueryValueType<T[KK], O[KK]>
};

type Result = ResolveQueryType<
  Query,
  { you: true; me: { id: true; email: true; age: true; cat: { meow: true } } }
>;

let r: Result;

(() => {
  const a = r.me.age;
})();

export interface Query {
  __typename: Query;
  me: User;
  you: ID;
}
export interface User {
  __typename: User;
  type: UserType | null;
  id: ID;
  email: String;
  age: Int | null;
  toys: (String | null)[];
  other: String[] | null;
  cat: Cat | null;
}
export type UserType = "Admin" | "User" | "Guest";
export type ID = string;
export type String = string;
export type Int = number;
export interface Cat {
  __typename: Cat;
  id: ID;
  meow: String | null;
}
export type Boolean = boolean;
export type Date = any;
export interface Thing {
  __typename: Thing;
  id: ID;
}
export interface Dog {
  __typename: Dog;
  id: ID;
  woof: String | null;
}
export type Animal = Cat | Dog;
export interface MakeUser {
  __typename: MakeUser;
  email: String;
  age: Int | null;
  toys: (String | null)[];
  thing: Thing;
}
