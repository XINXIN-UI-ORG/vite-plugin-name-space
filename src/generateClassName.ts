import { TagHandler, BaseTag, SpaceTag, AttrsType, IsTag } from './tag';

const BODY_TAG = 'body';
const NAME_BASE_ATTR = 'x-base';
const NAME_SPACE_ATTR = 'x-space';
const NAME_IS_ATTR = 'x-is';

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
  }

  // 设置调用链
  const baseHandler: TagHandler = new BaseTag(NAME_BASE_ATTR);
  const spaceHandler: TagHandler = new SpaceTag(NAME_SPACE_ATTR);
  const isHandler: TagHandler = new IsTag(NAME_IS_ATTR);
  baseHandler.setNextChain(spaceHandler);
  spaceHandler.setNextChain(isHandler);

  // 处理标签内容
  baseHandler.handler(attrsMap, attrs, node, parentNode);
}