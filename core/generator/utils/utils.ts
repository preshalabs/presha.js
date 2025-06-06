import fs from 'fs/promises';
import path from 'path';

/**
 * Ensures the parent directory exists and writes the file to disk.
 */
export async function writeToFile(filePath: string, content: string) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, 'utf-8');
}
