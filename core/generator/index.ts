import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import { ProjectMeta } from '../types/ProjectMeta';
import { ModelMeta } from '../types/ModelMeta';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// When running from dist, we need to go up one level from the generator directory
const TEMPLATE_DIR = path.resolve(__dirname, '..', 'generator/templates');
const OUTPUT_DIR = path.resolve(process.cwd(), 'src/generated');

type TemplateType = 'model' | 'repository' | 'service' | 'controller' | 'route';

const TEMPLATE_MAP: Record<TemplateType, string> = {
  model: 'model.ts.ejs',
  repository: 'repository.ts.ejs',
  service: 'service.ts.ejs',
  controller: 'controller.ts.ejs',
  route: 'route.ts.ejs'
};

const OUTPUT_PATHS: Record<TemplateType, (name: string) => string> = {
  model: (name: string) => `models/${name}.ts`,
  repository: (name: string) => `repositories/${name}.repository.ts`,
  service: (name: string) => `services/${name}.service.ts`,
  controller: (name: string) => `controllers/${name}.controller.ts`,
  route: (name: string) => `routes/${name}.route.ts`
};

const BASE_TEMPLATE_DIR = path.join(TEMPLATE_DIR, 'base');
const BASE_OUTPUT_DIR = path.join(OUTPUT_DIR, 'base');

function renderTemplate(templatePath: string, data: object): string {
  const template = fs.readFileSync(templatePath, 'utf8');
  return ejs.render(template, data);
}

function generateBaseFiles() {
  const baseTemplates = fs.readdirSync(BASE_TEMPLATE_DIR);

  baseTemplates.forEach((file) => {
    const from = path.join(BASE_TEMPLATE_DIR, file);
    const to = path.join(BASE_OUTPUT_DIR, file.replace(/\.ejs$/, ''));

    if (!fs.existsSync(to)) {
      fs.mkdirSync(path.dirname(to), { recursive: true });
      fs.writeFileSync(to, renderTemplate(from, {}));
      console.log(`✅ Base file created: ${to}`);
    } else {
      console.log(`⏩ Base file exists: ${to}`);
    }
  });
}

function generateModelFiles(model: ModelMeta) {
  for (const [type, templateFile] of Object.entries(TEMPLATE_MAP)) {
    const from = path.join(TEMPLATE_DIR, templateFile);
    const to = path.join(
      OUTPUT_DIR,
      OUTPUT_PATHS[type as TemplateType](model.name)
    );

    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.writeFileSync(to, renderTemplate(from, model));
  }
}

export async function generateAll(projectMeta: ProjectMeta) {
  generateBaseFiles();
  projectMeta.domain.forEach(generateModelFiles);
}
