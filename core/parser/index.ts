import { parseDomainModels } from './tsMorph/domainParser';
import { parseAppRoutes } from './tsMorph/appParser';
import { ProjectMeta } from '../types/ProjectMeta';

export async function parseProject(): Promise<ProjectMeta> {
  const domain = await parseDomainModels('src/domain');
  const app = await parseAppRoutes('src/app');

  return { domain, app };
}
