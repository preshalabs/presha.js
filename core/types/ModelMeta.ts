export interface PropertyMeta {
  name: string;
  type: string;
  optional: boolean;
}

export interface ModelMeta {
  name: string;
  properties: PropertyMeta[];
}
