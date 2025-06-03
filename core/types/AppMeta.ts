// core/types/AppMeta.ts

export interface AppRouteMeta {
  method: string; // 'POST', 'GET', etc.
  path: string; // actual declared route path e.g. '/flowers/give'
  filePath: string; // full path to file
  handlerProperty: string; // default: 'handler'
}
