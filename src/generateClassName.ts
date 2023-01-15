const BODY_TAG = 'body';
const NAME_BASE_ATTR = 'name-base';
const NAME_SPACE_ATTR = 'name-space';
const CLASS_ATTR = 'class';

type AttrsType = { name: string, value: string };

export function generateClassName(parentNode: any, node: any) {
  if (node.tagName === BODY_TAG || !parentNode) {
    return;
  }

  const attrs = node.attrs || [];
  const attrsMap: Map<string, string> = attrs.reduce((result: Map<string, string>, current: AttrsType) => {
    result.set(current.name, current.value);
    return result;
  }, new Map<string, string>());

  if (!attrsMap.has(NAME_BASE_ATTR) && !attrsMap.has(NAME_SPACE_ATTR)) {
    node.baseClass = parentNode.baseClass;
    return;
  }

  if (attrsMap.has(NAME_BASE_ATTR)) {
    const nameClass = `x-${attrsMap.get(NAME_BASE_ATTR)}`;
    addClass(attrsMap, nameClass, attrs);
    
    // 保存当前基础类名
    node.baseClass = nameClass;
    removeAttr(attrs, NAME_BASE_ATTR);

  }

  if (attrsMap.has(NAME_SPACE_ATTR)) {
    const lastLevelClass = parentNode.baseClass;
    if (!lastLevelClass) {
      return;
    }

    const baseClass = `${lastLevelClass}__${attrsMap.get(NAME_SPACE_ATTR)}`;
    addClass(attrsMap, baseClass, attrs);
    node.baseClass = baseClass;
    removeAttr(attrs, NAME_SPACE_ATTR);
  }
}

function addClass(attrsMap: Map<string, string>, nameClass: string, attrs: AttrsType[]) {
  const curClass = attrsMap.get(CLASS_ATTR);
  attrsMap.set(CLASS_ATTR, curClass ? `${curClass} ${nameClass}` : nameClass);
  modifyAttrs(attrs, CLASS_ATTR, attrsMap.get(CLASS_ATTR)!);
}

function modifyAttrs(attrs: AttrsType[], key: string, value: string) {
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

function removeAttr(attrs: AttrsType[], key: string) {
  const index = attrs.findIndex(item => item.name === key);
  attrs.splice(index, 1);
}