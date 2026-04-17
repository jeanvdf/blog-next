import { PostModel } from '@/models/PostModel';

export interface PostRepository {
  findAll(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel>;

  findAllPublished(): Promise<PostModel[]>;
  findBySlugPublished(slug: string): Promise<PostModel>;
}
