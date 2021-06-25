# 使用泛型创建对象

### 构造签名

有时，泛型类可能需要基于传入的泛型T来创建其类型相关的对象。比如：

```ts
class FirstClass {
    id: number | undefined
}

class SecondClass {
    name: string | undefined
}

class GenericCreator<T> {
    create(): T {
        return new T()
    }
}

const creator1 = new GenericCreator<FirstClass>();
const firstClass: FirstClass = creator1.create()

const creator2 = new GenericCreator<SecondClass>()
const secondClass: SecondClass = creator2.create()
```

在以上代码中，我们定义了两个普通类和一个泛型类`GenericCreator<T>`。在通用的`GenericCreator`泛型类中，我们定义了一个名为`create`的成员方法，该方法会使用`new`关键字来调用传入的实际类型的构造函数，来创建对应的对象。但可惜的是，以上代码并不能正常运行，对于以上代码，在编译器会提示以下错误：

```
'T' only refers to a type, but is being used as a value here.
```

这个错误的意思是: `T`类型仅指类型，但此处被用作值。那么如何解决这个问题呢？根据TypeScript文档，为了使用通用类能够创建T类型的对象，我们需要通过其构造函数来引用T类型。对于上述问题，在介绍具体的解决方案前，我们先来介绍一下构造签名。

在TypeScript接口中，你可以使用`new`关键字来描述一个构造函数：

```ts
interface Point {
    new (x: number, y: number): Point
}
```

以上接口中的`new (x: number, y: number)`我们称之为构造签名，其语法如下：
```ts
ConstructSignature: new TypeParametersopt(ParameterListopt)
TypeAnnotationopt
```

在上述构造签名中，`TypeParametersopt, ParameterListopt, TypeAnnotationopt`分别表示：可选的类型参数，可选的参数列表，可选的类型注解。与该语法相应的几种常见的形式如下：

```ts
new C
new C(...)
new C<...>(...)
```

介绍完构造签名，我们再来介绍一个与之相关的概念，即构造函数类型。


### 构造函数类型

在TypeScript语言规范中这样定义构造函数类型：

> An object type containing one or more construct signatures is said to be a **constructor type**. Constructor types may be written using constructor type literals or by including construct signatures in object type literals.

通过规范中的描述信息，可以得出以下结论：
- 包含一个或多个构造签名的对象类型被称为构造函数类型；
- 构造函数类型可以使用构造函数类型字面量或包含构造签名的对象类型字面量来编写。

那么什么是构造函数类型字面量呢？构造函数类型字面量是包含单个构造函数签名的对象类型的简写。具体来说，构造函数类型字面量的形式如下：

```ts
new <T1, T2, ...> (p1, p2, ...) => R
```

该形式与以下对象类型字面量是等价的：

```ts
{ new <T1, T2, ...> (p1, p2, ...): R }
```

下面我们来举个实际的示例：

```ts
// 构造函数类型字面量
new (x: number, y: number) => Point
```

等价于以下对象类型字面量：

```ts
{ new (x: number, y: number): Point }
```


### 构造函数类型的应用

在介绍构造函数类型的应用前，我们先看看例子：

```ts
interface Point {
    new (x: number, y: number): Point
    x: number
    y: number
}

class Point2D implements Point {
    readonly x: number
    readonly y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

const point: Point = new Point2D(1, 2)
```

对于以上的代码，TypeScript编译器会提示以下错误信息：

```
Class 'Point2D' incorrectly implements interface 'Point'.
Type 'Point2D' provides no match for the signature 'new (x: number, y: number): Point'.

```

相信很多刚接触TypeScript不久的小伙伴都会遇到上述的问题。要解决这个问题，我们就需要把对前面定义的`Point`接口进行分离，即把接口的属性和构造函数类型进行分离：

```ts
interface Point {
    x: number
    y: number
}

interface PointConstructor {
    new (x: number, y: number): Point
}
```

完成接口拆分之后，除了前面已经定义的`Point2D`类之外，我们又定义了一个`newPoint`工厂函数，该函数用于根据传入的`PointConstructor`类型的构造函数，来创建对应的Point对象。

```ts
class Point2D implements Point {
    readonly x: number
    readonly y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

function newPoint (pointConstructor: PointConstructor,
    x: number,
    y: number
): Point {
    return new pointConstructor(x, y)
}

const point: Point = newPoint(Point2D, 1, 2)
```


### 使用泛型创建对象

了解完构造签名和构造函数类型之后，下面我们来开始解决上面遇到的问题，首先我们需要重构以下`create`方法，具体如下所示：

```ts
class GenericCreator<T> {
    create<T>(c: { new(): T }): T {
        return new c
    }
}
```

在以上代码中，我们重定义了`create`成员方法，根据该方法的签名，我们可以知道该方法接收一个参数，其类型是构造函数类型，且该构造函数不包含任何参数，调用该构造函数后，会返回类型T实例。

如果构造函数含有参数的话，比如包含一个`number`类型的参数时，我们可以这样定义`create`方法：

```ts
create<T>(c: new(a: number) => T, num: number): T {
    return new c(num)
}
```

更新完 `GenericCreator`泛型类，我们就可以使用下面的方式来创建`FirstClass`和`SecondClass`类的实例：

```ts
const creator1 = new GenericCreator<FirstClass>()
const firstClass: FirstClass = creator1.create(FirstClass)

const creator2 = new GenericCreator<SecondClass>()
const secondClass: SecondClass = creator2.create(SecondClass)
```