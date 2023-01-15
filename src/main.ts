import type { PluginOption } from 'vite';
import { transfer2Node, transfer2String } from './transfer';

export default function NameSpacePlugin(): PluginOption {
  return {
    name: 'vite-plugin-name-space',
    enforce: 'pre',
    transform(code, id) {
      if (!/\.vue/.test(id)) {
        return code;
      }

      // 提取template
      const matchTemplate = new RegExp(String.raw`<template>([\s\S]+)</template>`);
      const result = code.match(matchTemplate);
      if (!result || result.length < 2) {
        return code;
      }

      // 转换html内容
      const astNode = transfer2Node(result[1]);
      return code.replace(matchTemplate, `<template>${transfer2String(astNode)}</template>`);
    },
    
  };
}


// const text = `
// <div name-space="upload" class="testtt">
// {{ msg }}
// </div>
// `;

// const dom = Parser.parse(text) as any;
// console.log(dom);

// console.log(dom.childNodes[0].childNodes[1].childNodes[0].attrs);
// dom.childNodes[0].childNodes[1].childNodes[0].attrs[1].value = '1234565fdbhfsdbj';

// const str = serialize((<any>dom).childNodes[0].childNodes[1]);
// console.log(str);