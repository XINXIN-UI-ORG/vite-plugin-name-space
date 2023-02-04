import { AttrsType, TagHandler } from "./AbstractTag";

export class BmTag extends TagHandler {
  public handlerTag(attrsMap: Map<string, string>, attrs: AttrsType[], node: any, parentNode: any): void {
    const bmAttrs = attrsMap.get(this.tagName)!.trim();

    let classList: string[] = [];
    if (bmAttrs.startsWith('[')) {
      const pureAttrs = bmAttrs.slice(1, bmAttrs.length - 1);
      classList = pureAttrs.split(',').filter(item => item.trim());
    } else {
      classList.push(bmAttrs);
    }

    classList.forEach(item => {
      const name = `'${node.baseClass}-' + ${item}`
      this.addClass(attrsMap, name, attrs, false);
    });

    this.removeAttr(attrs, this.tagName);
  }
}