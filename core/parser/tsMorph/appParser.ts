import { Project, SyntaxKind } from 'ts-morph';
import path from 'path';
import { AppRouteMeta } from '../../types/AppMeta';

export async function parseAppRoutes(
  relativeDir: string
): Promise<AppRouteMeta[]> {
  const project = new Project({ tsConfigFilePath: 'tsconfig.json' });
  const fullPath = path.resolve(process.cwd(), relativeDir);
  const sourceFiles = project.addSourceFilesAtPaths(`${fullPath}/**/*.ts`);

  const routes: AppRouteMeta[] = [];

  for (const file of sourceFiles) {
    const routeVar = file.getVariableDeclaration('route');
    if (!routeVar) continue;

    const obj = routeVar.getInitializerIfKindOrThrow(
      SyntaxKind.ObjectLiteralExpression
    );

    const methodProp = obj.getProperty('method');
    const pathProp = obj.getProperty('path');

    const method =
      methodProp
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getLiteralText() ?? 'POST';
    const pathValue =
      pathProp
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getLiteralText() ?? '';

    routes.push({
      method,
      path: pathValue,
      handlerProperty: 'handler',
      filePath: file.getFilePath()
    });
  }

  return routes;
}
