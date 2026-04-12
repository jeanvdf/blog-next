import { PostDate } from '../PostDate';
import { PostHeading } from '../PostHeading';

type PostSummaryProps = {
  postHeading: 'h1' | 'h2';
  createdAt: string;
  title: string;
  excerpt: string;
  postLink: string;
};

export function PostSummary({
  postHeading = 'h2',
  createdAt,
  title,
  excerpt,
  postLink,
}: PostSummaryProps) {
  return (
    <div className="flex flex-col gap-4 sm:justify-center">
      <PostDate date={createdAt} relative />
      <PostHeading url={postLink} as={postHeading}>
        {title}
      </PostHeading>

      <p>{excerpt}</p>
    </div>
  );
}
