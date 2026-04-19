import { drizzlePostRepository } from '@/repositories';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findAllPostsPublished = cache(
  unstable_cache(
    async () => {
      return await drizzlePostRepository.findAllPublished();
    },
    ['posts'],
    {
      tags: ['posts'],
    },
  ),
);

export const findPostBySlugCached = cache((slug: string) =>
  unstable_cache(
    async () => {
      const post = await drizzlePostRepository.findBySlugPublished(slug).catch(() => undefined);
      if (!post) {
        notFound();
      }

      return post;
    },
    [`post-${slug}`],
    {
      tags: [`post-${slug}`],
    },
  )(),
);

export const findPostByIdCached = cache((id: string) =>
  unstable_cache(async () => await drizzlePostRepository.findById(id), [`post-${id}`], {
    tags: [`post-${id}`],
  }),
);
