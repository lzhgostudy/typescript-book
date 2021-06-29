# is关键字

本节介绍TypeScript中的`is`关键字，它被称为类型谓词，用来判断一个变量属于某个接口或类型。如果需要封装一个类型判断函数，你应该第一时间想到它，本节列出了一些常用的类型判断函数以供参考。

`is`关键字一般用于函数返回值类型中，判断参数是否属于某一类型，并根据结果返回对应的布尔类型。

语法: `prop is type`

### 举例说明

在一些兑换码场景，经常会需要将兑换码全部转为大写，之后再进行判断：

```ts
function isString(s: unknown): boolean {
  return typeof s === 'string'
}

function toUpperCase(x: unknown) {
  if (isString(x)) {
    x.toUpperCase() // Error, Object is of type 'unknown'
  }
}
```

**代码解释**
可以看到TypeScript抛出了一个错误提示，一个unknown类型的对象不能进行`toUpperCase()`操作，可是在上一行明明已经通过`isString()`函数确认参数`x`为`string`类型，但是由于函数嵌套TypeScript不能进行正确的类型判断。

这时，就可以使用`is`关键字：

```ts
const isString = (val: unknown): val is string => typeof val === 'string'

function toUpperCase(x: unknown) {
  if (isString(x)) {
    x.toUpperCase()
  }
}
```

**解释：**

通过`is`关键字将类型范围缩小为string类型，这也是一种代码健壮性的约束规范。


### 一些拓展函数

```ts
const isNumber = (val: unknown): val is number => typeof val === 'number'

const isString = (val: unknown): val is string => typeof val === 'string'

const isFunction = (val: unknown): val is Function => typeof val === 'function'

const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'

function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

const objectToString = Object.prototype.toString

const toTypeString = (value: unknown): string => objectToString.call(value)

const isPlainObject = (val: unknown): val is object => toTypeString(val) === '[object Object]'
```

### 小结

`is` 关键字经常用来封装”类型判断函数”，通过和函数返回值的比较，从而缩小参数的类型范围，所以类型谓词 `is` 也是一种类型保护。