# tsconfig

## 编译上下文

编译上下文算是一个比较花哨的术语，可以用它来给文件分组，告诉TypeScript哪些文件是有效的，哪些是无效的。除了有效文件所携带信息外，编译上下文包含有正在被使用的编译选项的信息。定义这种逻辑分组，一个比较好的方式是使用`tsconfig.json`文件。


### tsconfig.json

#### 基础

开始使用`tsconfig.json`是一件比较容易的事，你仅仅需要写下：

```json
{}
```

例如，在项目的根目录下创建一个空JSON文件。通过这种方式，TypeScript将会把此目录和子目录下的所有`.ts`文件作为编译上下文的一部分，它还会包含一部分默认的编译选项。

#### 编译选项

你可以通过`compilerOptions`来定制你的编译选项：

```json
{
  "compilerOptions": {
    /** 基本选项 */
    "target": "es5",        // 指定ECMAScript目标版本: 'ES3'(default), 'ES5', 'ES6/ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",   // 指定生成代码的模板标准: 'commonjs', 'amd', 'system', 'umd', or 'es2015'
    "lib": [],
    "allowJs": true,        // 允许编译 javascript 文件
    "checkJs": true,        // 报告 javascript 文件中的错误
    "jsx": "preserve",      // 指定 jsx 代码的生成: 'preserve', 'react', 'react-native'
    "declaration": true,    // 生成相应的 .d.ts 文件
    "declarationDir": "",
    "sourceMap": true,      // 生成相应的 .map 文件
    "outFile": "single.js",        // 将输出文件合并为一个文件
    "outDir": "./dist",     // 指定输出目录
  }
}
```