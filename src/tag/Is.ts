import { TagHandler, AttrsType } from "./AbstractTag";

export class IsTag extends TagHandler {
  
  public handlerTag(attrsMap: Map<string, string>, attrs: AttrsType[], node: any, parentNode: any): void {
    console.log(attrsMap.get(this.tagName));
  }
}

