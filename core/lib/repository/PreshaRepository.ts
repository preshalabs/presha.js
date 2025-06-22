import { PreshaModelInterface } from '../model/PreshaModelInterface.js';
import { PreshaRepositoryInterface } from './PreshaRepositoryInterface.js';

export class PreshaRepository<T> implements PreshaRepositoryInterface<T> {
  constructor(private model: PreshaModelInterface<T>) {}

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async findAll(): Promise<T[]> {
    return this.model.findAll();
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return this.model.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.model.delete(id);
  }
}
