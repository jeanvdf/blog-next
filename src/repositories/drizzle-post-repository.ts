import { drizzleDb } from '@/db/drizzle';
import { PostModel } from '@/models/PostModel';
import { PostRepository } from './post-repository';
import { postsTable } from '@/db/drizzle/schemas';
import { updateTag } from 'next/cache';
import { eq } from 'drizzle-orm';
import { except } from 'drizzle-orm/gel-core';

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

  async create(post: PostModel): Promise<PostModel> {
    const duplicateValidation = await drizzleDb.query.posts.findFirst({
      where: (posts, { or, eq }) => or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    });

    if (!!duplicateValidation) {
      throw new Error(`Este post já existe.`);
    }

    await drizzleDb.insert(postsTable).values(post);
    updateTag('posts');
    return post;
  }

  async delete(id: string): Promise<PostModel> {
    const duplicateValidation = await this.findById(id);

    if (!duplicateValidation) {
      throw new Error(`Post não encontrado para o id ${id}`);
    }

    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

    updateTag(`post-${duplicateValidation.slug}`);
    updateTag('posts');

    return duplicateValidation;
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    const oldPost = await this.findById(id);

    if (!oldPost) {
      throw new Error(`Post não encontrado para o id ${id}`);
    }

    const now = new Date().toISOString();
    const newPost = {
      title: newPostData.title,
      excerpt: newPostData.excerpt,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      published: newPostData.published,
      author: newPostData.author,
      updatedAt: now,
    };

    await drizzleDb.update(postsTable).set(newPost).where(eq(postsTable.id, id));

    return { ...oldPost, ...newPost };
  }
}
