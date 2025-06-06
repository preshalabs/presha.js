import { ModelMeta } from '../../types/ModelMeta';

export function generateDrizzleModel(model: ModelMeta): string {
  const tableName = model.name.toLowerCase();

  const fields = model.properties.map((prop) => {
    return `  ${prop.name}: ${mapTypeToDrizzle(prop.type)},`;
  });

  return `
import { pgTable, varchar, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const ${tableName} = pgTable('${tableName}', {
${fields.join('\n')}
});
  `.trim();
}

function mapTypeToDrizzle(type: string): string {
  const map: Record<string, string> = {
    string: 'varchar()',
    number: 'integer()',
    boolean: 'boolean()',
    Date: 'timestamp()',
    any: 'varchar()'
  };

  return map[type] || 'varchar()';
}
