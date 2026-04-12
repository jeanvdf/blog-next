import SinglePost from '@/components/SinglePost';
import { SpinLoader } from '@/components/SpinLoader';
import { findPostBySlugCached } from '@/lib/post/queries';
import { Suspense } from 'react';

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;

  const post = await findPostBySlugCached(slug);

  return {
    title: `Post - ${post.title}`,
    description: `${post.excerpt}`,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<SpinLoader className="min-h-20 mb-16" />}>
      <SinglePost slug={slug} />
    </Suspense>
  );
}
