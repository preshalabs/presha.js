// import { parseModels } from '../../parser/tsMorphParser'
// import { generateAll } from '../../generator'
import { parseProject } from '../../parser';
import { generateAll } from '../../generator';

export async function runBuild() {
  console.log('🔧 Building project...');

  // Parse the project to extract metadata about domain models and application routes
  const projectMeta = await parseProject();

  // Generate code based on the parsed metadata
  await generateAll(projectMeta);

  console.log('✅ Build completed.');
}
