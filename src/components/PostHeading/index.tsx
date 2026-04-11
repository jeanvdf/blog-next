import clsx from 'clsx';
import Link from 'next/link';

type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as?: 'h1' | 'h2';
};

export function PostHeading({ children, url, as: Tag = 'h2' }: PostHeadingProps) {
  const TagClassesMap = {
    h1: 'text-2xl/tight font-bold mt-2 mb-4',
    h2: 'text-xl/tight mt-2 mb-4',
  };

  return (
    <Tag className={clsx(TagClassesMap[Tag], 'sm:text-3xl/tight', 'group-hover:text-slate-600')}>
      <Link href={url}>{children}</Link>
    </Tag>
  );
}
