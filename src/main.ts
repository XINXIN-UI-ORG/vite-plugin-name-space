import type { PluginOption } from 'vite';
import { transfer2Node, transfer2String } from './transfer';
import { walk } from './walk';
import { generateClassName } from './generateClassName';

export default function NameSpacePlugin(config: { [propName: string]: string }): PluginOption {
  return {
    name: 'vite-plugin-name-space',
    enforce: 'pre',
    transform(code, id) {
      console.log("88****&*&*&*&", config, "(((((()))))))");
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
      walk(null, astNode, (parentNode, node) => {
        // console.log(node);
      });
      return code.replace(matchTemplate, `<template>${transfer2String(astNode)}</template>`);
    },
    
  };
}


const text = `
<div name-base="upload" class="testtt">
  <div name-space="default">
    <div>
      <span name-space="icon">
        text
      </span>
    </div>
  </div>
</div>
`;

const astNode = transfer2Node(text);
walk(null, astNode, generateClassName);
console.log(transfer2String(astNode));