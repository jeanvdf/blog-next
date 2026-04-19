import { findAllPostsPublished } from '@/lib/post/public-queries';
import { PostImage } from '../PostImage';
import { PostSummary } from '../PostSummary';

export async function PostFeatured() {
  const posts = await findAllPostsPublished();
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
          src: '/images/tech01.png',
          width: 1536,
          height: 1024,
          alt: 'Título',
        }}
      />

      <PostSummary
        postHeading="h1"
        createdAt="2023-10-10T10:00:00Z"
        title="Teste primeiro post"
        excerpt="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae corporis ea dignissimos reiciendis dolores? Veniam laudantium explicabo praesentium iste similique commodi, nisi ex odio voluptatem eveniet totam sunt quo enim!"
        postLink={postLink}
      />
    </section>
  );
}
