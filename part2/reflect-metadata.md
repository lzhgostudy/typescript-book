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

