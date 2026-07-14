import { ManagePostForm } from '@/components/ManagePostForm';
import { findPostByIdAdmin } from '@/lib/post/admin-queries';
import { Metadata } from 'next';

type AdminPostIdPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Editar post',
};

export default async function AdminPostIdPage({ params }: AdminPostIdPageProps) {
  const { id } = await params;

  const post = await findPostByIdAdmin(id).catch();
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-extrabold">Editar Post</h1>
      <ManagePostForm mode="update" publicPost={post} />
    </div>
  );
}
