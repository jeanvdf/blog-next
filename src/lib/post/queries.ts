import { jsonPostRepository } from '@/repositories';
import { cache } from 'react';

export const findAllPostsPublished = cache(async () => await jsonPostRepository.findPublished());
