import { findAllPostsPublished } from '@/lib/post/queries';
import { PostImage } from '../PostImage';
import { PostSummary } from '../PostSummary';

export default async function PostsList() {
  const posts = await findAllPostsPublished();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:grid-cols-3">
      {posts.slice(1).map((post) => {
        const postLink = `/post/${post.slug}`;
        return (
          <div className="flex flex-col gap-4 group" key={post.id}>
            <PostImage
              linkProps={{
                href: postLink,
              }}
              imageProps={{
                src: post.coverImageUrl,
                width: 1536,
                height: 1024,
                alt: post.title,
              }}
            />
            <PostSummary
              postHeading="h2"
              createdAt={post.createdAt}
              title={post.title}
              excerpt={post.excerpt}
              postLink={postLink}
            />
          </div>
        );
      })}
    </div>
  );
}
