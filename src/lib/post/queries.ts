import { drizzlePostRepository } from '@/repositories';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findAllPostsPublished = unstable_cache(
  cache(async () => {
    return await drizzlePostRepository.findAllPublished();
  }),
  ['posts'],
  {
    tags: ['posts'],
  },
);

export const findPostBySlugCached = (slug: string) =>
  unstable_cache(
    cache(async () => {
      const post = await drizzlePostRepository.findBySlugPublished(slug).catch(() => undefined);
      if (!post) {
        notFound();
      }

      return post;
    }),
    [`post-${slug}`],
    {
      tags: [`post-${slug}`],
    },
  );

export const findPostByIdCached = (id: string) =>
  unstable_cache(
    cache(async () => await drizzlePostRepository.findById(id)),
    [`post-${id}`],
    {
      tags: [`post-${id}`],
    },
  );
