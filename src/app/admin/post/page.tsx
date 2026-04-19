import PostsListAdmin from '@/components/PostsListAdmin';
import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';

export default async function AdminPostPage() {
  return (
    <Suspense fallback={<SpinLoader className="min-h-20 mb-16" />}>
      <PostsListAdmin />
    </Suspense>
  );
}
