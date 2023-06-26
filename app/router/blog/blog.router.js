import { Router } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export const BlogRoutes = Router();

BlogRoutes.get('/:lng', (req, res) => {
  const { lng } = req.params;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const fileDir = join(
    __dirname,
    '..',
    '..',
    '..',
    `/locales/${lng}/translation.json`,
  );

  res.sendFile(fileDir);
});
