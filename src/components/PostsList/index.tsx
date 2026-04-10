import { jsonPostRepository } from '@/repositories';

export default async function PostsList() {
  const posts = await jsonPostRepository.findAll();
  return (
    <div>
      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}
