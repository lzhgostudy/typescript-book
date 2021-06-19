# Reflect Metadata

## 基础

Reflect Metadata是ES7的一个提案，它主要是用来在声明的时候添加和读取元数据。TypeScript在1.5+的版本已经支持它，你只需要：

- `npm i reflect-metadata --save`
- 在 `tsconfig.json` 里配置 `emitDecoratorMetadata` 选项

Reflect Metadata 的 API 可以用于类或者类的属性上，如：

```ts
function metadata(metadataKey: any, metadataValue: any): {
  (target: Function): void
  (target: Object, propertyKey: string | symbol): void
};
```

`Reflect.metadata`当做`Decorator`使用，当修饰类时，在类上添加元数据，当修饰类属性时，在类原型的属性上添加元数据，如：

```ts
@Reflect.metadata('inClass', 'A')
class Test {
  @Reflect.metadata('inMethod', 'B')
  public hello(): string {
    return 'hello world'
  }
}

console.log(Reflect.getMetadata('inClass', Test))   
// result -> 'A'
console.log(Reflect.getMetadata('inMethod', new Test(), 'hello'))
// result -> 'B'
```

## 获取类型信息

譬如在`vue-property-decorator`6.1及其以下版本中，通过使用`Reflect.getMetadata`API，`Prop` Decorator能获取属性类型传至Vue，简要代码如下：

```ts
function Prop(): PropertyDecorator {
  return (target, key: string) => {
    const type = Reflect.getMetadata('design:type', target, key);
    console.log(`${key} type: ${type.name}`);
    // other...
  }
}

class SomeClass {
  @Prop()
  public Aprop!: string
}
```

运行代码可在控制台看到 `Aprop type: string`。除能获取属性类型外，通过 `Reflect.getMetadata("design:paramtypes", target, key)` 和 `Reflect.getMetadata("design:returntype", target, key)` 可以分别获取函数参数类型和返回值类型。


## 自定义 `metadataKey`

除了能获取类型信息外，常用于自定义`metadataKey`，并在合适的时机获取它的值，示例如下：

```ts
function classDecorator(): ClassDecorator {
  return target => {
    // 在类上定义元数据，key为 classMetadata, value 为 a
    Reflect.defineMetadata("classMetaData", 'a', target)
  }
}

function methodDecorator(): MethodDecorator {
  return (target, key, descriptor) => {
    // 在类的原型属性 'someMethod' 上定义元数据，key 为 `methodMetaData`，value 为 `b`
    Reflect.defineMetadata('methodMetaData', 'b', target, key)
  }
}

@classDecorator()
class SomeClass {
  @methodDecorator()
  someMethod()
}

Reflect.getMetadata('classMetaData', SomeClass)   // 'a'
Reflect.getMetadata('methodMetaData', new SomeClass(), 'someMethod') // 'b'

```

## API

```ts
import 'reflect-metadata'

// 元数据的命令式定义，定义对象或属性的元数据
Reflect.defineMetadata(metadataKey, metadataValue, target)
Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey)

// 检查对象或属性的原型链上是否存在元数据键
let result = Reflect.hasMetadata(metadataKey, target)
let result = Reflect.hasMetadata(metadataKey, target, propertyKey)

// 检查对象或属性是否存在自己的元数据键
let result = Reflect.hasOwnMetadata(metadataKey, target)
let result = Reflect.hasOwnMetadata(metadataKey, target, propertyKey)


// 获取对象或属性原型链上元数据键的值
let result = Reflect.getMetadata(metadataKey, target)
let result = Reflect.getMetadata(metadataKey, target, propertyKey)

// 获取对象或属性自己的元数据的值
let result = Reflect.getOwnMetadata(metadataKey, target)
let result = Reflect.getOwnMetadata(metadataKey, target, propertyKey)

// 获取对象或属性原型链上的所有元数据的键名
let result = Reflect.getMetadataKeys(target)
let result = Reflect.getMetadataKeys(target, propertyKey)

// 获取对象或属性的所有自己的元数据的键名
let result = Reflect.getOwnMetadataKeys(target)
let result = Reflect.getOwnMetadataKeys(target, propertyKey)

// 从对象或属性中删除元数据
let result = Reflect.deleteMetadata(metadataKey, target)
let result = Reflect.deleteMetadata(metadataKey, target, propertyKey)


// 通过装饰器将元数据应用于构造函数
@Reflect.metadata(metadataKey, metadataValue)
class C {
  // 通过装饰器将元数据应用于方法(属性)
  @Reflect.metadata(metadataKey, metadataValue)
  method() { }
}
```