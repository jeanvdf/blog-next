export type PostModel = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author: string;
};

export type PublicPost = Omit<PostModel, 'updatedAt'>;

export const makePartialPublicPost = (post?: Partial<PostModel>): PublicPost => {
  return {
    id: post?.id || '',
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    coverImageUrl: post?.coverImageUrl || '',
    published: post?.published || false,
    createdAt: post?.createdAt || '',
    author: post?.author || '',
  };
};

export const makePublicPost = (post: PostModel): PublicPost => {
  return makePartialPublicPost(post);
};
