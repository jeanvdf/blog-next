import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type PostImageProps = {
  imageProps: React.ComponentProps<typeof Image>;
  linkProps: React.ComponentProps<typeof Link>;
};

export function PostImage({ imageProps, linkProps }: PostImageProps) {
  return (
    <Link
      {...linkProps}
      className={'w-full h-full overflow-hidden rounded-xl block' + linkProps.className}
    >
      <Image
        className={
          'w-full h-full group-hover:scale-105 transition object-cover object-center' +
          imageProps.className
        }
        {...imageProps}
        alt={imageProps.alt}
        priority
      ></Image>
    </Link>
  );
}
