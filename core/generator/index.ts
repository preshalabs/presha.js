// import { parseModels } from '../parser/tsMorphParser';
import { generateZodSchemas } from './zod/zodGenerator';
import { generateRouteBindings } from './routes/routeGenerator';
import { generateCrudRoutesForModels } from './routes/domainRoutesGenerator';
import { generateDbModels } from './db/dbGenerator';

import { ProjectMeta } from '../types/ProjectMeta';

export async function generateAll(projectMeta: ProjectMeta) {
  const { domain } = projectMeta;

  // await generateZodSchemas(domain);
  // await generateDbModels(domain);
  await generateCrudRoutesForModels(domain);
  await generateRouteBindings(projectMeta);
}
