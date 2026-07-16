import { jsonPostRepository } from '@/repositories';
import { eq } from 'drizzle-orm';
import { drizzleDb } from '.';
import { postsTable } from './schemas';

// (async () => {
//   const posts = await jsonPostRepository.findAll();
//   console.log(posts);
//   try {
//     await drizzleDb.insert(postsTable).values(posts);
//   } catch (error) {
//     console.error('Error inserting posts into the database:', error);
//   }
// })();
