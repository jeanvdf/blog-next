'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
import { drizzlePostRepository } from '@/repositories';

export async function deletePostAction(id: string) {
  const isAuthenticated = await verifyLoginSession();
  if (!isAuthenticated) {
    return {
      error: 'Faça login novamente.',
    };
  }
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
