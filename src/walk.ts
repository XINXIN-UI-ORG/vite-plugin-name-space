export function walk(parentNode: any, astNode: any, enter: (parentNode: any, node: any) => void) {
  const child = astNode.childNodes;
  enter(parentNode, astNode);

  if (child && child.length > 0) {
    Array.from(child).forEach(item => walk(astNode, item, enter));
  }
}
