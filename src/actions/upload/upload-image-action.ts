'use server';

import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(formData: FormData): Promise<UploadImageActionResult> {
  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' });
  }

  const file = formData.get('file');

  if (!file) {
    return makeResult({ error: 'Dados inválidos' });
  }

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválidos' });
  }

  const maxSizeUploadImage = Number(process.env.NEXT_PUBLIC_FILE_UPLOADER_MAX_SIZE) || 900 * 1024;
  if (file.size > maxSizeUploadImage) {
    return makeResult({ error: 'Arquivo muito grande' });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Imagem inválida' });
  }

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;

  const diretorioImage = process.env.IMAGE_UPLOAD_DIR || 'uploads';
  const uploadFullPath = resolve(process.cwd(), 'public', diretorioImage);
  await mkdir(uploadFullPath, { recursive: true });

  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const fileFullPath = resolve(uploadFullPath, uniqueImageName);

  await writeFile(fileFullPath, buffer);

  const imgServerUrl = process.env.IMAGE_SERVER_URL || 'http://localhost:3000/uploads';
  const url = `${imgServerUrl}/${uniqueImageName}`;

  return makeResult({ url });
}
