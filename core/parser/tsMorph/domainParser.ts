import { Project } from 'ts-morph';
import path from 'path';
import { ModelMeta } from '../../types/ModelMeta';

export async function parseDomainModels(
  relativeDir: string
): Promise<ModelMeta[]> {
  const project = new Project({ tsConfigFilePath: 'tsconfig.json' });
  const fullPath = path.resolve(process.cwd(), relativeDir);
  const sourceFiles = project.addSourceFilesAtPaths(`${fullPath}/**/*.ts`);

  const models: ModelMeta[] = [];

  for (const file of sourceFiles) {
    for (const iface of file.getInterfaces()) {
      const name = iface.getName();
      const properties = iface.getProperties().map((prop) => ({
        name: prop.getName(),
        type: prop.getType().getText(),
        optional: prop.hasQuestionToken()
      }));
      models.push({ name, properties });
    }
  }

  return models;
}
