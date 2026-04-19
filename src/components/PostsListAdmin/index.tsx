import { findAllPostsAdmin } from '@/lib/post/admin-queries';
import Link from 'next/link';
import { DeleteButton } from '../DeleteButton';
import { ModalConfirm } from '../Modal/ModalConfirm';

export default async function PostsListAdmin() {
  const posts = await findAllPostsAdmin();

  return (
    <div className="py-16 text-xl flex flex-col-reverse gap-2">
      {posts.map((post) => {
        return (
          <div
            className={`p-2 flex gap-4 ${!post.published && 'bg-slate-300'} rounded justify-between items-center`}
            key={post.id}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>
            {!post.published && (
              <span className="text-xs text-slate-600 italic">(Não publicado)</span>
            )}
            <DeleteButton id={post.id} title={post.title} />
          </div>
        );
      })}

      <ModalConfirm />
    </div>
  );
}
