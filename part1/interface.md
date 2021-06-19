# 接口


## 简要

- 在TypeScript里，接口的作用就是为代码定义结构契约；
- 若函数的形参是一个对象，实际上实参可能会包含很多属性，但是编译器只会检查对应形参声明里那些必须的属性是否存在，并且其类型是否匹配。例如：

```ts
function printLabel(labeledObj: { label: string }) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

/**
 *  myObj就算多传了size，编译器也不会在乎。 
 */
```

- 可选属性：接口里的属性不全是必需的`?:`；
- 只读属性：一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 `readonly` 来指定只读属性；
- 额外的属性检查：如果一个对象字面量存在任何接口声明里不包含的属性时，你会得到一个错误。绕开这些检查最简单的方法，可以使用类型断言。
- 函数类型
- 可索引类型：Typescript 支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型
- **类类型**：`implements`，当一个类型实现了一个接口时，只对其实例部分进行检查，不会对静态部分进行检查。
- 接口继承：一个接口可以继承多个接口
- **混合类型**：一个对象可以同时做为函数和对象使用，并带有额外的属性。
```ts
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function(start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function() {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

- **接口继承类**: 当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。