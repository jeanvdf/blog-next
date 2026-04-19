import { drizzleDb } from '@/db/drizzle';
import { PostModel } from '@/models/PostModel';
import { PostRepository } from './post-repository';

export class DrizzlePostRepository implements PostRepository {
  async findAll(): Promise<PostModel[]> {
    console.log('FindAll');
    const allPosts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });
    return allPosts;
  }

  async findAllPublished(): Promise<PostModel[]> {
    console.log('findAllPublished');
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    console.log('findById');
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });
    if (!post) {
      throw new Error(`Post não encontrado com id: ${id}`);
    }
    return post;
  }

  async findBySlugPublished(slug: string): Promise<PostModel> {
    console.log('findBySlugPublished');
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) => and(eq(posts.slug, slug), eq(posts.published, true)),
    });
    if (!post) {
      throw new Error(`Post não encontrado com slug: ${slug}`);
    }

    return post;
  }
}

// (async () => {
//   const repo = new DrizzlePostRepository();
//   const post = await repo.findAllPublished();
//   console.log(post);
// })();
