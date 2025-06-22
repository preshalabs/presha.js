import { PreshaRepositoryInterface } from '../repository/PreshaRepositoryInterface.js';
import { PreshaServiceInterface } from './PreshaServiceInterface.js';

export class PreshaService<T> implements PreshaServiceInterface<T> {
  constructor(protected repository: PreshaRepositoryInterface<T>) {}

  async get(id: string): Promise<T | null> {
    return this.repository.findById(id);
  }

  async getAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async create(data: Partial<T>): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
