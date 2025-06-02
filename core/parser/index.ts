import { parseDomainModels } from './tsMorph/domainParser';
import { ModelMeta } from './tsMorph/domainParser';

export async function parseProject(): Promise<{ domain: ModelMeta[] }> {
  const domain = await parseDomainModels('src/domain');
  return { domain };
}
