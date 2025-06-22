import { PreshaControllerInterface } from '../controller/PreshaControllerInterface.js';
import { PreshaModelInterface } from '../model/PreshaModelInterface.js';
import { PreshaRepositoryInterface } from '../repository/PreshaRepositoryInterface.js';
import { PreshaServiceInterface } from '../service/PreshaServiceInterface.js';

export interface PreshaKitInterface<T> {
  readonly model: PreshaModelInterface<T>;
  readonly repository: PreshaRepositoryInterface<T>;
  readonly service: PreshaServiceInterface<T>;
  readonly controller: PreshaControllerInterface<T>;
}
