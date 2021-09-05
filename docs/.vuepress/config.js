module.exports = {
  title: "TypeScript Book",
  themeConfig: {
    sidebar: [
      {
        title: "指南",
        children: [
          ["/guide/typescript-in-5-minutes.md", "5分钟了解TypeScript"],
        ],
      },
      {
        title: "入门",
        children: [
          ["/basic/basic-types.md", "基础类型"],
          ["/basic/interfaces.md", "接口"],
          ["/basic/functions.md", "函数"],
          ["/basic/literal-types.md", "字面量类型"],
          // ["/basic/", "联合类型和交叉类型"],
          ["/basic/classes.md", "类"],
          ["/basic/enums.md", "枚举"],
          ["/basic/generics.md", "泛型"],
        ],
      },
    ],
  },
};
