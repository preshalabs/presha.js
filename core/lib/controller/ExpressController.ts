import { Router, Request, Response } from 'express';
import { PreshaControllerInterface } from './PreshaControllerInterface';
import { PreshaServiceInterface } from '../service/PreshaServiceInterface.js';

export class ExpressController<T> implements PreshaControllerInterface<T> {
  public readonly router: Router;

  constructor(private service: PreshaServiceInterface<T>) {
    this.router = Router();

    this.router.get('/', this.getAllHandler);
    this.router.get('/:id', this.getHandler);
    this.router.post('/', this.createHandler);
    this.router.put('/:id', this.updateHandler);
    this.router.delete('/:id', this.deleteHandler);
  }

  public async getAll(): Promise<T[]> {
    return this.service.getAll();
  }

  public async get(id: string): Promise<T | null> {
    return this.service.get(id);
  }

  public async create(data: Partial<T>): Promise<T> {
    return this.service.create(data);
  }

  public async update(id: string, data: Partial<T>): Promise<T> {
    return this.service.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.service.delete(id);
  }

  private getAllHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const result = await this.getAll();
    res.json(result);
  };

  private getHandler = async (req: Request, res: Response): Promise<void> => {
    const result = await this.get(req.params.id);
    if (!result) {
      res.status(404).json({ message: 'Not found' });
      return;
    }
    res.json(result);
  };

  private createHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const result = await this.create(req.body);
    res.status(201).json(result);
  };

  private updateHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const result = await this.update(req.params.id, req.body);
    res.json(result);
  };

  private deleteHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    await this.delete(req.params.id);
    res.status(204).send();
  };
}
