import { ExpressController } from '../controller/ExpressController.js';
import { PreshaControllerInterface } from '../controller/PreshaControllerInterface.js';
import { PreshaModelInterface } from '../model/PreshaModelInterface.js';
import { PreshaRepository } from '../repository/PreshaRepository.js';
import { PreshaRepositoryInterface } from '../repository/PreshaRepositoryInterface.js';
import { PreshaService } from '../service/PreshaService.js';
import { PreshaServiceInterface } from '../service/PreshaServiceInterface.js';
import { PreshaKitInterface } from './PreshaKitInterface.js';

export abstract class PreshaKit<T> implements PreshaKitInterface<T> {
  public readonly model: PreshaModelInterface<T>;
  public readonly repository: PreshaRepositoryInterface<T>;
  public readonly service: PreshaServiceInterface<T>;
  public readonly controller: PreshaControllerInterface<T>;

  constructor(
    model: PreshaModelInterface<T>,
    repo?: PreshaRepositoryInterface<T>,
    svc?: PreshaServiceInterface<T>,
    ctrl?: PreshaControllerInterface<T>
  ) {
    this.model = model;
    this.repository = repo ?? new PreshaRepository<T>(model);
    this.service = svc ?? new PreshaService<T>(this.repository);
    this.controller = ctrl ?? new ExpressController<T>(this.service);
  }

  // TODO: add support for hooks
}
