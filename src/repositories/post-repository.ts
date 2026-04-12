import { PostModel } from '@/models/PostModel';

export interface PostRepository {
  findPublished(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel>;
}
