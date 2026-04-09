import { PostModel } from '@/models/PostModel';

export interface PostRepository {
  findAll(): Promise<PostModel[]>;
}
