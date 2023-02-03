import { TagHandler, AttrsType } from "./AbstractTag";

/**
 * 处理x-base标签
 */
export class BaseTag extends TagHandler {
  public handlerTag(attrsMap: Map<string, string>, attrs: AttrsType[], node: any): void {
    const nameClass = `x-${attrsMap.get(this.tagName)}`;
    this.addClass(attrsMap, nameClass, attrs);
    
    // 保存当前基础类名
    node.baseClass = nameClass;
    this.removeAttr(attrs, this.tagName);
  }
}