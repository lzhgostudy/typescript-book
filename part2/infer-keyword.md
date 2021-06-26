# infer关键字

本节要介绍的`infer`关键字有些难理解，我们来做一个类比帮助理解。

语句`let num`中，通过`let`来声明一个变量，那怎么声明一个不确定的类型变量呢？答案是使用`infer`关键字，`infer R`就是声明了一个类型变量`R`。

> 在条件类型表达式中，可以在`extends`条件语句中使用`infer`关键字来声明一个待推断的类型变量。


### 通过 ReturnType 理解 infer

infer相对比较难理解，我们先看看TypeScript一个内置类型`ReturnType`，它用于获取函数返回值类型。

```ts
const add = (x: number, y: number) => x + y
type t = ReturnType<typeof add>   // type t = number
```

> 代码解释：通过`ReturnType`可以得到函数`add()`的返回值类型为`number`类型。但要注意不要滥用这个工具类型，应尽量多的手动标注函数返回值类型。

来看一下`ReturnType`的实现源码：

```ts
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
```

`infer`的作用是让`TypeScript`自己推断，并将推断结果存储到一个类型变量中，`infer`只能用于`extends`语句中。

再来看看`ReturnType`的实现：如果`T`满足约束条件`(...args: any) => any`，并且能够赋值给`(...args: any) => infer R`，则返回类型为`R`，否则为`any`类型。

继续看几个例子：

```ts
type T0 = ReturnType<() = string>           // string
type T1 = ReturnType<(s: string) => void    // void
type T2 = ReturnType<<T>() => T>            // unknown
```

> 代码解释：
上述3个语句，只要满足约束条件`(...args: any) => any`，TypeScript推断出函数的返回值，并借助`infer`关键字将其储存在类型变量`R`中，那么最终得到返回类型`R`。