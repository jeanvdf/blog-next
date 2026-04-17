import { readFile } from 'fs/promises';
import { resolve } from 'path';

import { PostModel } from '@/models/PostModel';
import { PostRepository } from './post-repository';

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(ROOT_DIR, 'src', 'db', 'seed', 'posts.json');

const WAIT_TIME_MS = 0;

export class JsonPostRepository implements PostRepository {
  private async simulateDelay() {
    if (WAIT_TIME_MS <= 0) return;
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME_MS));
  }

  private async readFromDisk(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, 'utf-8');
    const parsedContent = JSON.parse(jsonContent);
    const { posts } = parsedContent;
    return posts;
  }

  async findAll(): Promise<PostModel[]> {
    await this.simulateDelay();
    const posts = await this.readFromDisk();

    return posts;
  }

  async findAllPublished(): Promise<PostModel[]> {
    await this.simulateDelay();
    const posts = await this.readFromDisk();

    return posts.filter((post) => post.published);
  }

  async findById(id: string): Promise<PostModel> {
    await this.simulateDelay();
    const posts = await this.readFromDisk();
    const post = posts.find((post) => post.id === id);

    if (!post) {
      throw new Error(`Post não encontrado com id: ${id}`);
    }

    return post;
  }

  async findBySlugPublished(slug: string): Promise<PostModel> {
    await this.simulateDelay();
    const posts = await this.readFromDisk();
    const post = posts.find((post) => post.slug === slug);

    if (!post) {
      throw new Error(`Post não encontrado com slug: ${slug}`);
    }

    return post;
  }
}
