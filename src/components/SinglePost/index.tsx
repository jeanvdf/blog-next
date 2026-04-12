import { findPostBySlugCached } from '@/lib/post/queries';
import Image from 'next/image';
import { PostHeading } from '../PostHeading';
import { PostDate } from '../PostDate';
import { SafeMarkdown } from '../SafeMarkdown';

type SinglePostProps = {
  slug: string;
};

export default async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPostBySlugCached(slug);

  return (
    <article className="mb-8">
      <header>
        <Image
          className="rounded-xl"
          src={post.coverImageUrl}
          alt={post.title}
          priority
          width={1536}
          height={1024}
        ></Image>
      </header>

      <div className="flex flex-col gap-4">
        <PostHeading as="h1" url={`/post/${post.slug}`}>
          {post.title}
        </PostHeading>
        <PostDate date={post.createdAt} />
        <div className="text-xl text-slate-500">{post.excerpt}</div>
        <SafeMarkdown content={post.content} />
      </div>
    </article>
  );
}
