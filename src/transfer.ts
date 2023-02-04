import { Parser, serialize } from 'parse5';

export function transfer2Node(source: string): any {
  return (Parser.parse(source) as any).childNodes[0].childNodes[1];
}

export function transfer2String(node: any): string {
  return serialize(node).replace(/=""/g, '').replace(/&amp;/g, '&');
}