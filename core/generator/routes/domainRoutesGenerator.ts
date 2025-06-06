import { ModelMeta } from '../../types/ModelMeta';
import { writeToFile } from '../utils/utils';
import path from 'path';

export async function generateCrudRoutesForModels(models: ModelMeta[]) {
  const outputDir = path.resolve('src/generated/routes');

  for (const model of models) {
    const name = model.name.toLowerCase(); // e.g. "user"
    const plural = name + 's'; // naive pluralization
    const idParam = 'id'; // assumed primary key name

    const code = `
import { Router } from 'express';

const router = Router();

router.get('/${plural}', async (req, res) => {
  res.json({ message: 'GET all ${plural}' });
});

router.get('/${plural}/:${idParam}', async (req, res) => {
  res.json({ message: 'GET ${name} by id', id: req.params.${idParam} });
});

router.post('/${plural}', async (req, res) => {
  res.json({ message: 'POST new ${name}', body: req.body });
});

router.put('/${plural}/:${idParam}', async (req, res) => {
  res.json({ message: 'PUT update ${name}', id: req.params.${idParam}, body: req.body });
});

router.delete('/${plural}/:${idParam}', async (req, res) => {
  res.json({ message: 'DELETE ${name}', id: req.params.${idParam} });
});

export default router;
`.trim();

    const filePath = path.join(outputDir, `${name}.ts`);
    await writeToFile(filePath, code);
  }
}
