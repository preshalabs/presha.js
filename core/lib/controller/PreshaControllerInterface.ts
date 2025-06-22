export interface PreshaControllerInterface<T> {
  create(data: Partial<T>): Promise<T>;
  get(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
