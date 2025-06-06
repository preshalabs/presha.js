import { AppRouteMeta } from '../../types/AppMeta';
import path from 'path';
import { writeToFile } from '../utils/utils';

export async function generateRouteBindings(routes: AppRouteMeta[]) {
  const outputDir = path.resolve('src/generated/routes');
  const filePath = path.join(outputDir, 'index.ts');

  const lines: string[] = [
    `import { Router } from 'express';`,
    ``,
    `const router = Router();`,
    ``
  ];

  for (const route of routes) {
    const relativeImportPath = path
      .relative(outputDir, route.filePath)
      .replace(/\\/g, '/') // Windows-safe
      .replace(/\.ts$/, ''); // Strip .ts

    lines.push(
      `router.${route.method.toLowerCase()}('${route.path}', require('${relativeImportPath}').route.${route.handlerProperty});`
    );
  }

  lines.push(``, `export default router;`);

  const fileContent = lines.join('\n');
  await writeToFile(filePath, fileContent);
}
