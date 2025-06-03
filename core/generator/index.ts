// import { parseModels } from '../parser/tsMorphParser';
// import { generateZodSchemas } from './zod';
// import { generateRoutes } from './routes';
// import { generateDbModels } from './db';

import { ProjectMeta } from '../types/ProjectMeta';

export async function buildProject(projectMeta: ProjectMeta) {
  console.log('🔧 Building project from project meta: ', projectMeta);

  // TODO: Need to implement the actual generation logic
  //   const models = await parseModels('models'); // relative path from cwd
  //   await generateZodSchemas(models);
  //   await generateRoutes(models);
  //   await generateDbModels(models);
}
