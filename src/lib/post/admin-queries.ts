import { drizzlePostRepository } from '@/repositories';
import { unstable_cache } from 'next/cache';

export const findAllPostsAdmin = unstable_cache(
  async () => {
    return await drizzlePostRepository.findAll();
  },
  ['posts-admin'],
  {
    tags: ['posts'],
  },
);

export const findPostByIdAdmin = unstable_cache(
  async (id: string) => {
    return await drizzlePostRepository.findById(id);
  },
  ['post-admin-by-id'],
  {
    tags: ['posts'],
  },
);
