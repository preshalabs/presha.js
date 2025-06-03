// import { parseModels } from '../../parser/tsMorphParser'
// import { generateAll } from '../../generator'
import { parseProject } from '../../parser';

export async function runBuild() {
  console.log('🔧 Building project...');
  const projectMeta = await parseProject();
  console.log('Parsed project:', projectMeta);
  // await generateAll(projectMeta); // core/generator/index.ts
  console.log('✅ Build completed.');
}
