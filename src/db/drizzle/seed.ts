// import { jsonPostRepository } from '@/repositories';
// import { postsTable } from './schemas';
// import { drizzleDb } from '.';
// import { eq } from 'drizzle-orm';

// INSERT
// (async () => {
//   const posts = await jsonPostRepository.findAll();
//   console.log(posts);
//   try {
//     await drizzleDb.insert(postsTable).values(posts);
//   } catch (error) {
//     console.error('Error inserting posts into the database:', error);
//   }
// })();

// UPDATE
// (async () => {
//   const posts = await jsonPostRepository.findAll();
//   console.log(posts);
//   try {
//     await drizzleDb
//       .update(postsTable)
//       .set({ published: false })
//       .where(eq(postsTable.id, 'c1f4a4c1-1f8f-4d36-9f51-001a1c100009'));
//   } catch (error) {
//     console.error('Error inserting posts into the database:', error);
//   }
// })();
