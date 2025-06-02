import { Project } from 'ts-morph';
import path from 'path';

export interface PropertyMeta {
  name: string;
  type: string;
  optional: boolean;
}

export interface ModelMeta {
  name: string;
  properties: PropertyMeta[];
}

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
