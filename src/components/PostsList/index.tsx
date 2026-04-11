import { jsonPostRepository } from '@/repositories';
import { PostHeading } from '../PostHeading';
import { PostImage } from '../PostImage';

export default async function PostsList() {
  const posts = await jsonPostRepository.findAll();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:grid-cols-3">
      {posts.map((post) => {
        const postLink = `/post/${post.slug}`;
        return (
          <div className="flex flex-col gap-4 group" key={post.id}>
            <PostImage
              linkProps={{
                href: postLink,
              }}
              imageProps={{
                src: post.coverImageUrl,
                width: 1200,
                height: 720,
                alt: post.title,
              }}
            />
            <div className="flex flex-col gap-4 sm:justify-center">
              <time className="text-slate-400 " dateTime={post.createdAt}>
                {new Date(post.createdAt).toLocaleDateString('pt-BR')}
              </time>
              <PostHeading url={postLink} as="h2">
                {post.title}
              </PostHeading>

              <p>{post.excerpt}</p>
            </div>
          </div>
        );
      })}
      ;
    </div>
  );
}
