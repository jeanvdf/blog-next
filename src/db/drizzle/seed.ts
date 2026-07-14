import { drizzlePostRepository } from '@/repositories';
import { eq } from 'drizzle-orm';
import { drizzleDb } from '.';
import { postsTable } from './schemas';

(async () => {
  const posts = await drizzlePostRepository.findAll();
  console.log(posts);
  try {
    await drizzleDb.insert(postsTable).values(posts);
  } catch (error) {
    console.error('Error inserting posts into the database:', error);
  }
})();

(async () => {
  const posts = await drizzlePostRepository.findAll();
  console.log(posts);
  try {
    await drizzleDb
      .update(postsTable)
      .set({ published: false })
      .where(eq(postsTable.id, 'c1f4a4c1-1f8f-4d36-9f51-001a1c100008'));
  } catch (error) {
    console.error('Error inserting posts into the database:', error);
  }
})();
