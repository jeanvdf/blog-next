import { findAllPostsAdmin } from '@/lib/post/admin-queries';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Post Admin',
};

export default async function AdminPostPage() {
  const posts = await findAllPostsAdmin();

  return (
    <div className="py-16 text-xl">
      {posts.map((post) => {
        return <p key={post.id}> {post.title} </p>;
      })}
    </div>
  );
}
