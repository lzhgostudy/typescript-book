# 属性描述符

**对象属性描述符**在编程实践中是通过Object对象的`defineProperty`方法暴露给我们。所以搞清楚`Object.defineProperty`是理解**对象属性描述符**的唯一途径。

`Object.definedProperty`，`defined property`翻译成中文就是定义属性，顾名思义就是为对象定义或修改属性的细节，即通过属性描述符来定义属性读写的权限。使用该方法允许精确添加或修改对象的属性：

```ts
Object.defineProperty(obj, prop, descriptor)
```

`defineProperty`接收3个参数，obj表示要修改或者定义属性的对象，prop是要定义或者修改的属性名称，`descriptor`属性描述符用于该属性的特性。

`descriptor`是一个对象，对象里的属性描述符有两种类型：**数据描述符**和存取描述符。

**数据描述符**是一个具有值的属性，该值可能是可写的，也可能不是可写的。

**存取描述符**是由`getter-setter`函数对描述的属性。

一个描述符只能是这两者中之一，不能同时是两者。

数据描述符和存取描述符均具有以下可选键值：
- **configurable**: 如果为false，则任何尝试删除目标属性或者修改属性以下特性（writable, configurable, enumerable）的行为将被无效化，默认值为 `false`。
- **enumerable**: 是否能枚举。也就是能否被`for-in`遍历。默认为`false`

数据描述符还具有以下可选键值：
- **value**: 该属性对应的值。可以是任何有效的JavaScript值。默认是`undefined`
- **writable**: 当且仅当该属性的键值为`true`，属性的值`value`才能被改变，默认 `false`


存取描述符：
- **get**: 目标属性被访问就会回调此方法，并将此方法的运算结果返回用户。默认为`undefined`
- **set**: 目标属性被赋值，就会调回此方法。默认为`undefined`

描述符可同时具有的键值：

||configurable|enumerable|value|writable|get|set|
|-|-|-|-|-|-|
|数据描述符|Yes|Yes|Yes|Yes|No|No|
|存取描述符|Yes|Yes|No|No|Yes|Yes|

如果一个描述符不具有`value, writable, get, set`任意一个关键字，那么它将被认为是一个数据描述符。如果一个描述符同时拥有`value`或`writable`和`get`或`set`键，则会产生一个异常。