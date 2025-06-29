import { PreshaField } from '../types/PreshaSchema';

export interface PreshaModelInterface<T> {
  name: string;
  fields: Record<string, PreshaField>;
  create(data: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
