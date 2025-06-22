import path from 'path';
import { writeToFile } from '../utils/utils';
import { ProjectMeta } from '../../types/ProjectMeta';

export async function generateRouteBindings(projectMeta: ProjectMeta) {
  const { app, domain } = projectMeta;
  const outputDir = path.resolve('src/generated/routes');
  const filePath = path.join(outputDir, 'index.ts');

  const lines: string[] = [
    `import { express } from 'presha/runtime/express';`,
    ``,
    `const router = express.Router();`,
    ``
  ];

  // App-level feature routes (e.g. src/app/auth/login.ts)
  for (const route of app) {
    const relativeImportPath = path
      .relative(outputDir, route.filePath)
      .replace(/\\/g, '/') // Windows-safe
      .replace(/\.ts$/, ''); // Strip .ts

    lines.push(
      `import { route as ${route.path.split('/').pop()}Route } from '${relativeImportPath}.js';`
    );
  }

  // Add route handlers
  lines.push(``);
  for (const route of app) {
    const routeName = route.path.split('/').pop();
    lines.push(
      `router.${route.method.toLowerCase()}('${route.path}', ${routeName}Route.handler);`
    );
  }

  // Domain model CRUD routes
  lines.push(``);
  for (const model of domain) {
    const name = model.name.toLowerCase();
    lines.push(`import ${name}Router from './${name}.js';`);
    lines.push(`router.use('/', ${name}Router);`);
  }

  lines.push(``, `export default router;`);

  const fileContent = lines.join('\n');
  await writeToFile(filePath, fileContent);
}
