'use server';

import { drizzleDb } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { drizzlePostRepository } from '@/repositories';
import { asyncDelay } from '@/utils/async-delay';
import { eq } from 'drizzle-orm';
import { updateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  await asyncDelay(2000);
  console.log('Resultado e id: ', id);

  if (!id || typeof id !== 'string')
    return {
      error: 'Dados inválidos',
    };

  const post = await drizzlePostRepository.findById(id).catch(() => undefined);

  if (!post) return { error: 'Post não encontrado.' };

  await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

  updateTag(`post-${post.slug}`);
  updateTag('posts');

  return { error: '' };
}
