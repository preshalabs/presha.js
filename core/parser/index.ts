import { parseDomainModels } from './tsMorph/domainParser';
import { parseAppRoutes } from './tsMorph/appParser';
import { ProjectMeta } from '../types/ProjectMeta';

/**
 * Parses the user's project to extract metadata about domain models and application routes.
 * This function serves as the central point for analyzing the project's code structure.
 *
 * The parsing is performed using `tsMorph`, a library for working with TypeScript code,
 * which allows us to navigate and extract information from the project's source files.
 * If needed, the parsing implementation can be switched to another library or approach
 * with minimal changes.
 *
 * @returns {Promise<ProjectMeta>} A promise that resolves to the project's metadata,
 * including domain models and application routes.
 */
export async function parseProject(): Promise<ProjectMeta> {
  const domain = await parseDomainModels('src/domain');
  const app = await parseAppRoutes('src/app');

  return { domain, app };
}
