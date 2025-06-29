export type PreshaFieldType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'uuid'
  | 'timestamp'
  | 'json';

export interface PreshaField {
  type: PreshaFieldType;
  primary?: boolean;
  unique?: boolean;
  nullable?: boolean;
  default?: unknown;
}

export interface PreshaModelSchema {
  name: string;
  fields: Record<string, PreshaField>;
}
