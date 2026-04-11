import { PostHeading } from '../PostHeading';
import { PostImage } from '../PostImage';

export function PostFeatured() {
  const slug = 'qualquer-coisa';
  const postLink = `/post/${slug}`;

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
          width: 1200,
          height: 720,
          alt: 'Título',
        }}
      />
      <div className="flex flex-col gap-4 sm:justify-center">
        <time className="text-slate-400" dateTime="10/10/2023">
          10:00 - 10/10/2023
        </time>
        <PostHeading url={postLink} as="h1">
          Teste primeiro post
        </PostHeading>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae corporis ea
          dignissimos reiciendis dolores? Veniam laudantium explicabo praesentium iste similique
          commodi, nisi ex odio voluptatem eveniet totam sunt quo enim!
        </p>
      </div>
    </section>
  );
}
