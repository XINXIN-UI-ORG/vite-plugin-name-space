export type AttrsType = { name: string, value: string };

const CLASS_ATTR = 'class';

export abstract class TagHandler {
  protected nextHandler: TagHandler | null;

  protected tagName: string;

  constructor(tagName: string) {
    this.tagName = tagName;
    this.nextHandler = null;
  }

  public setNextChain(nextHandler: TagHandler): void {
    this.nextHandler = nextHandler;
  }

  /**
   * 标签处理的抽象方法 具有有各自标签实现
   * 
   * @param attrsMap 标签名和标签内容的map
   * @param attrs 标签对象的集合
   * @param node 当前节点
   * @param parentNode 下一个节点
   */
  public abstract handlerTag(attrsMap: Map<string, string>, attrs: AttrsType[], node: any, parentNode: any): void;

  /**
   * 处理标签并调用下一个链
   * 
   * @param attrsMap 
   * @param attrs 
   * @param node 
   * @param parentNode 
   */
  public handler(attrsMap: Map<string, string>, attrs: AttrsType[], node: any, parentNode: any) {
    // 当前元素不存在该标签则跳过当前链的处理
    if (attrsMap.has(this.tagName)) {
      this.handlerTag(attrsMap, attrs, node, parentNode);
    }

    this.nextHandler?.handler(attrsMap, attrs, node, parentNode);
  }

  protected addClass(attrsMap: Map<string, string>, nameClass: string, attrs: AttrsType[]) {
    const curClass = attrsMap.get(CLASS_ATTR);
    attrsMap.set(CLASS_ATTR, curClass ? `${curClass} ${nameClass}` : nameClass);
    this.modifyAttrs(attrs, CLASS_ATTR, attrsMap.get(CLASS_ATTR)!);
  }
  
  protected modifyAttrs(attrs: AttrsType[], key: string, value: string) {
    const attr = attrs.find(attr => attr.name === key);
    if (!attr) {
      attrs.push({
        name: key,
        value,
      });
      return;
    }
  
    attr.value = value;
  }
  
  protected removeAttr(attrs: AttrsType[], key: string) {
    const index = attrs.findIndex(item => item.name === key);
    attrs.splice(index, 1);
  }
}
