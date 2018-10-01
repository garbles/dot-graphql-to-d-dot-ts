export namespace TypeUtils {
  // prettier-ignore
  type Walk<T, O> = 
    O extends true ? T :
    T extends null ? T extends (null | infer N) ? Resolve<N, O> | null :
    Resolve<T, O> : Resolve<T, O>;

  export type Resolve<T, O> = T extends null
    ? never
    : { [KK in keyof T & keyof O]: Walk<T[KK], O[KK]> };
}

export interface Query {
  __typename: Query;
  me: User;
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
