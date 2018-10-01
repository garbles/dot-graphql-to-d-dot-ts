export namespace TypeUtils {
  type Unwrap<T> = { [K in keyof T]: T[K] extends {} ? Unwrap<T[K]> : T[K] };

  type WalkA<T, O> = T extends null
    ? never
    : { [KK in keyof T & keyof O]: WalkB<T[KK], O[KK]> };

  type WalkB<T, O> = O extends true
    ? T
    : T extends null
      ? T extends (null | infer N) ? WalkA<N, O> | null : WalkA<T, O>
      : WalkA<T, O>;

  export type Resolve<T, O> = Unwrap<WalkA<T, O>>;
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
