import { TagHandler, AttrsType } from "./AbstractTag";

export class SpaceTag extends TagHandler {
  public handlerTag(attrsMap: Map<string, string>, attrs: AttrsType[], node: any, parentNode: any): void {
    const lastLevelClass = parentNode.baseClass;
    if (!lastLevelClass) {
      return;
    }

    const baseClass = `${lastLevelClass}__${attrsMap.get(this.tagName)}`;
    this.addClass(attrsMap, baseClass, attrs);
    node.baseClass = baseClass;
    this.removeAttr(attrs, this.tagName);
  }
}