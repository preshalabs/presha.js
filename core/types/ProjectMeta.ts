import { ModelMeta } from './ModelMeta';
import { AppRouteMeta } from './AppMeta';

export interface ProjectMeta {
  domain: ModelMeta[]; // Domain models metadata
  app: AppRouteMeta[]; // Application routes metadata
}
