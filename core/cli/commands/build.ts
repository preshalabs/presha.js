import { buildProject } from '../../generator'

export async function runBuild() {
  console.log('🔧 Building project...')
  await buildProject()
  console.log('✅ Build completed.')
}
