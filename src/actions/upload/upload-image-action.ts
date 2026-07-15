'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
import { put } from '@vercel/blob';
import { extname } from 'path';

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(formData: FormData): Promise<UploadImageActionResult> {
  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  const isAuthenticated = await verifyLoginSession();
  if (!isAuthenticated) {
    return makeResult({ error: 'Faça o login novamente.' });
  }

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

  try {
    // Envia para o Vercel Blob (storage de objetos). Usa BLOB_READ_WRITE_TOKEN das env vars.
    const blob = await put(uniqueImageName, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    return makeResult({ url: blob.url });
  } catch {
    return makeResult({ error: 'Falha ao enviar a imagem.' });
  }
}
