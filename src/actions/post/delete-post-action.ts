'use server';

import { drizzlePostRepository } from '@/repositories';

export async function deletePostAction(id: string) {
  if (!id || typeof id !== 'string')
    return {
      error: 'Dados inválidos',
    };

  try {
    await drizzlePostRepository.delete(id);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { error: e.message };
    }
    return { error: 'Erro desconhecido.' };
  }

  return { error: '' };
}
