import { ModelMeta } from '../../types/ModelMeta';
import { writeToFile } from '../utils';
import path from 'path';

export async function generateZodSchemas(models: ModelMeta[]) {
  const outputDir = path.resolve('src/generated/zod');

  for (const model of models) {
    const zodCode = generateZodFromModel(model);

    const filePath = path.join(outputDir, `${model.name}.ts`);
    await writeToFile(filePath, zodCode);
  }
}

function generateZodFromModel(model: ModelMeta): string {
  const lines = model.properties.map(p => {
    const base = `z.${tsTypeToZod(p.type)}`;
    return `  ${p.name}: ${base}${p.optional ? '.optional()' : ''},`;
  });

  return `import { z } from 'zod';\n\nexport const ${model.name}Schema = z.object({\n${lines.join('\n')}\n});\n`;
}

function tsTypeToZod(type: string): string {
  const map: Record<string, string> = {
    string: 'string()',
    number: 'number()',
    boolean: 'boolean()',
    Date: 'date()',
    any: 'any()',
  };
  return map[type] || 'any()';
}
