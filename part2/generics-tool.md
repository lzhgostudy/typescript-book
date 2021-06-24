# 实用工具类

为了方便开发者 TypeScript 内置了一些常用的工具类型，比如 Partial、Required、Readonly、Record 和 ReturnType 等。出于篇幅考虑，这里我们只简单介绍其中几个常用的工具类型。


### Partial

`Partial<T>` 的作用就是将某个类型里的属性全部变为可选项 `?`

```ts
/** Make all properties in T optional */
type Partial<T> = {
    [P in keyof T]?: T[P]
}
```

在以上代码中，首先通过`keyof T`拿到`T`的所有属性名，然后使用 `in` 进行遍历，将值赋给`P`，最后通过`T[P]`取得相应的属性值。中间的`?`号，用于将所哟属性变为可选。


### Record

`Record<K extends keyof any, T>` 的作用是将 `K` 中所有的属性的值转为`T` 类型。

```ts
/** Construct a type with a set of properties K of type T */
type Record<K extends keyof any, T> = {
    [P in K]: T
}
```


### Pick

`Pick<T, K extends keyof T>` 的作用是将某个类型中的子属性挑出来，变成包含这个类型部分的属性的子类型。

```ts
/** From T, pick a set of properties whose keys are in the union K */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
}
```


### Exclude

`Exclude<T, U>` 的作用是将某个类型中属于另一个的类型移除掉。

```ts
/** Exclude from T those types that are assignable to U */
type Exclude<T, U> = T extends U ? never : T;
```

如果`T`能赋值给`U`类型的话，那么就会返回`never`类型，否则返回`T`类型。最终实现的效果就是将`T`中某些属于`U`的类型移除掉。