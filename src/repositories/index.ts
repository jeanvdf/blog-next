import { JsonPostRepository } from './json-post-repository';
import { PostRepository } from './post-repository';

export const jsonPostRepository: PostRepository = new JsonPostRepository();
