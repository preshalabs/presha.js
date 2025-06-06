// core/generator/db/dbGenerator.ts
import { ModelMeta } from '../../types/ModelMeta';
import { generateDrizzleModel } from './drizzleAdapter';
import { writeToFile } from '../utils';
import path from 'path';

export async function generateDbModels(models: ModelMeta[]) {
  const outputDir = path.resolve('src/generated/db');

  for (const model of models) {
    const code = generateDrizzleModel(model);
    const filePath = path.join(outputDir, `${model.name}.ts`);
    await writeToFile(filePath, code);
  }
}
