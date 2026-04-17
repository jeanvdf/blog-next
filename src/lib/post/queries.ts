import { drizzlePostRepository } from '@/repositories';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findAllPostsPublished = cache(
  async () => await drizzlePostRepository.findAllPublished(),
);

export const findPostBySlugCached = cache(async (slug: string) => {
  const post = await drizzlePostRepository.findBySlugPublished(slug).catch(() => undefined);
  if (!post) {
    notFound();
  }

  return post;
});

export const findPostByIdCached = cache(
  async (id: string) => await drizzlePostRepository.findById(id),
);
