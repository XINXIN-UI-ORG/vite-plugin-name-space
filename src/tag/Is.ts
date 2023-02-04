import { TagHandler, AttrsType } from "./AbstractTag";

export class IsTag extends TagHandler {
  
  public handlerTag(attrsMap: Map<string, string>, attrs: AttrsType[], node: any, parentNode: any): void {
    const isAttrs = attrsMap.get(this.tagName)?.trim();
    if (!isAttrs) {
      return;
    }

    // 根据is生成class
    const pureIsAttrs = isAttrs.slice(1, isAttrs.length - 1);
    const classList = pureIsAttrs.split(',').filter(item => item.trim()).map(item => {
      const [key, value] = item.split(":");
      return `${node.baseClass}-${value.trim()} ? ${key.trim()} : ''`;
    });

    classList.forEach(name => {
      this.addClass(attrsMap, name, attrs, false);
    });

    this.removeAttr(attrs, this.tagName);
  }
}

