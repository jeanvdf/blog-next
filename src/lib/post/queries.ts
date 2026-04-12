import { jsonPostRepository } from '@/repositories';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findAllPostsPublished = cache(async () => await jsonPostRepository.findPublished());

export const findPostBySlugCached = cache(async (slug: string) => {
  const post = await jsonPostRepository.findBySlug(slug).catch(() => undefined);
  if (!post) {
    notFound();
  }

  return post;
});

export const findPostByIdCached = cache(
  async (id: string) => await jsonPostRepository.findById(id),
);
