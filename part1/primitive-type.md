# 基础类型

## 介绍

为了让程序有价值，我们需要能够处理最简单的数据单元：数字，字符串，结构体，布尔值等。TypeScript支持与JavaScript几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。

## Boolean

最基本的数据类型就是简单的`true/false`值，在JavaScript和TypeScript里叫做`boolean`。

```ts
let isDone: boolean = false;
```

## Number

和JavaScript一样，TypeScript里的所有数字都是浮点数或者整数。这些浮点数的类型是`number`，而大整数的类型则是`bigint`。除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript2015中引入的二进制和八进制字面量。

```ts
let decLiteral: number = 6
let hexLiteral: numebr = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
let bigLiteral: bigint = 100n; 
```

## String

JavaScript 程序的另一个基本操作是处理网页或者服务器端的文本数据。像其他语言里一样，我们使用`string`表示文本数据类型。和JavaScript一样，可以使用双引号或者单引号表示字符串。

```ts
let name: string = "bob";
name = "smith";
```

你还可以使用模板字符串，它可以定义多行文本和内嵌表达式。这种字符串时是被反引号包围，并且以`${ expr }` 这种形式嵌入表达式。

```ts
let name: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ name }.

I'll be ${ age + 1 } years old next month.`;
```

这与下面定义`sentence`的方式效果相同：

```ts
let sentence: string = "Hello, my name is " + name + ".\n\n" +
    "I'll be " + (age + 1) + " years old next month.";

```

## Array

TypeScript像JavaScript一样可以操作数组元素。有两种方式可以定义数组。
第一种，可以在元素类型后面接上`[]`，表示此类型元素组成的一个数组：

```ts
let list: number[] = [1, 2, 3]
```

第二种方式是使用数组泛型，`Array<元素类型>`:

```ts
let list: Array<number> = [1, 2, 3]
```


## Tuple

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。比如，你可以定义一对值分别为`string`和`number`类型的元组。

```ts
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello'];  // Error
```

当访问一个已知索引的元素，会得到正确的类型：

```ts
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'

```

当访问一个越界的元素会报错。

```ts
x[3] = "world"; // Error, Property '3' does not exist on type '[string, number]'.

console.log(x[5].toString()); // Error, Property '5' does not exist on type '[string, number]'.

```

## Enum

`enum`类型是对JavaScript标准数据类型的一个补充。像C#等其他语言一样，使用枚举类型可以为一组数值赋予友好的名字。

```ts
enum Color { Red, Green, Blue }
let c: Color = Color.Green;
```
默认情况下从`0`开始为元素编号。你也可以手动的指定成员的数值。例如，我们将上面的例子改成从`1`开始编号：

```ts
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;
```

或者，全部都采用手动赋值：

```ts
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
```

枚举类型提供一个便利是你可以由枚举的值得到它的名字。例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：

```ts
enum Color { Red = 1, Green, Blue }
let colorName: string = Color[2];

console.log(colorName);   // 显示'Green'因为上面代码里它的值是2
```

## Unknown

当我们在写应用的时候可能会需要描述一个我们还不知道其类型的变量。这些值可以来自动态内容，例如从用户获得，或者我们想在我们的API中接收所有可能类型的值。在这些情况下，我们想要编译器以及未来的用户知道这个变量可以是任意类型。这个时候我们会对它使用`unknown`类型。

```ts
let notSure: unknown = 4;
notSure = "maybe a string instead";

// OK, definitely a boolean
notSure = false;
```

如果你有一个`unknown`类型的变量，你可以通过进行`typeof`，比较或者更高级的类型检查来将其的类型范围缩小，这些方法会在后续章节中进一步讨论：

```ts
// @errors: 2322 2322 2322
declare const maybe: unknown;
// 'maybe' could be a string, object, boolean, undefined, or other types
const aNumber: number = maybe;

if (maybe === true) {
  // TypeScript knows that maybe is a boolean now
  const aBoolean: boolean = maybe;
  // So, it cannot be a string
  const aString: string = maybe;
}
if (typeof maybe === "string") {
  // TypeScript knows that maybe is a string
  const aString: string = maybe;
  // So, it cannot be a boolean
  const aBoolean: boolean = maybe;
}
```