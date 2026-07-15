import { findAllPostsPublished } from '@/lib/post/public-queries';
import { PostImage } from '../PostImage';
import { PostSummary } from '../PostSummary';
import ErrorMessage from '../ErrorMessage';

export async function PostFeatured() {
  const posts = await findAllPostsPublished();

  if (posts.length <= 0) {
    return (
      <ErrorMessage contentTitle="Ops :) " contentDescription="Ainda não criamos nenhum post" />
    );
  }
  const [post] = posts;
  const postLink = `/post/${post.slug}`;

  return (
    <section
      className="grid grid-cols-1 gap-8 mb-16 group
                  sm:grid-cols-2"
    >
      <PostImage
        linkProps={{
          href: postLink,
          className: 'rounded-xl',
        }}
        imageProps={{
          src: post.coverImageUrl,
          width: 1536,
          height: 1024,
          alt: post.title,
        }}
      />

      <PostSummary
        postHeading="h1"
        createdAt={post.createdAt}
        title={post.title}
        excerpt={post.excerpt}
        postLink={postLink}
      />
    </section>
  );
}
