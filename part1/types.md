# @types

毫无疑问，[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)是 TypeScript 最大的优势之一，社区已经记录了90%的顶级JavaScript 库。

这意味着，你可以非常高效地使用这些库，而无须在单独的窗口中打开相应的文档以确保输入的正确性。

### 使用`@types`

你可以通过`npm`来安装使用`@types`，例如为`jquery`添加声明文件:

```sh
npm i @types/jquery -D
```

`@types`支持全局和模块类型定义


### 全局`@types`

默认情况下，TypeScript会自动包含支持全局使用的任何声明定义。例如，对于jquery，你应该能够在项目中开始全局使用`$`。

### 模块`@types`

安装完之后，不需要特别的配置，你就可以像使用模块一样使用它：

```ts
import * as $ from 'jquery';

// 现在你可以此模块中任意使用$了 :)
```

### 控制全局

可以看出，对于某些团队而言，拥有允许全局使用的定义是一个问题。因此，你可以通过配置`tsconfig.json`的`compilerOptions.types`选项，引入有意义的类型：

```json
{
  "compilerOptions": {
    "types" : [
      "jquery"
    ]
  }
}
```

如上例所示，通过配置`compilerOptions.types: [ "jquery" ]`后，只允许使用`jquery`的`@types`包，即使这个人安装了另一个声明文件，比如：`npm install @types/node`，它的全局变量(例如：`process`) 也不会泄露到你的代码中，直到你将它添加到`tsconfig.json`类型选项中。


### 查找

大多数情况下，类型声明包的名字总是与其在`npm`上的包的名字相同，但是有`@types/`前缀。但如果你需要的话，你可以在[https://aka.ms/types](https://aka.ms/types)上找到你喜欢的库。

> 注意: 如果你要找的声明文件不存在，你可以贡献一份，这样就方便了下一位开发者。查看 DefinitelyTyped [贡献指南页](http://definitelytyped.org/guides/contributing.html) 了解详情。