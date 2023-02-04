export type AttrsType = { name: string, value: string };

const CLASS_ATTR = 'class';
const BIND_CLASS_ATTR = ':class';

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
    const tag = attrsMap.get(this.tagName);
    if (tag?.trim()) {
      this.handlerTag(attrsMap, attrs, node, parentNode);
    }

    this.nextHandler?.handler(attrsMap, attrs, node, parentNode);
  }

  protected addClass(attrsMap: Map<string, string>, nameClass: string, attrs: AttrsType[], stringfy: boolean = true) {
    // 将class转换成数组模式
    let classList: string[] = [];
    if (attrsMap.has(BIND_CLASS_ATTR)) {
      const bindClass = attrsMap.get(BIND_CLASS_ATTR)?.trim();
      try {
        classList = this.matchBindClass(bindClass || '')!;
      } catch (_) {
        // 不是数组或对象类型
        classList.push(bindClass || '');
      }
    } else {
      const curClass = attrsMap.get(CLASS_ATTR)?.trim();
      if (curClass) {
        classList = curClass.split(' ').map(item => `'${item}'`);
      }
    }
    
    classList.push(stringfy ? `'${nameClass}'` : nameClass);
    const stringfyClass = classList.reduce((total, current) => {
      return `${total}, ${current}`;
    });
    attrsMap.set(BIND_CLASS_ATTR, `[${stringfyClass}]`);
    this.modifyAttrs(attrs, BIND_CLASS_ATTR, attrsMap.get(BIND_CLASS_ATTR)!);
    
    // 清除原始的class
    attrsMap.delete(CLASS_ATTR);
    this.removeAttr(attrs, CLASS_ATTR);
  }

  private matchBindClass(bindClass: string) {
    const originClass = bindClass.replaceAll("\n", '');
    if (originClass.startsWith('[')) {
      const pureClass = originClass.slice(1, originClass.length - 1);

      return pureClass.split(',').filter(item => item.trim());
    } else if (originClass.startsWith('{')) {
      const pureClass = originClass.slice(1, originClass.length - 1);
      
      return pureClass.split(',').filter(item => item.trim()).map(item => {
        const [key, value] = item.split(':');
        return `${value.trim()} ? ${key.trim()} : ''`;
      });
    } else {
      throw new Error('not iterable element');
    }
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
    if (index !== -1) {
      attrs.splice(index, 1);
    }
  }
}
