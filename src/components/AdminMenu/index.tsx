'use client';

import clsx from 'clsx';
import { ArrowUpSquareIcon, CircleXIcon, HomeIcon, MenuIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button, buttonVariants } from '../ui/button';

export function AdminMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const [prevPathName, setPrevPathName] = useState(pathName);

  if (pathName !== prevPathName) {
    setPrevPathName(pathName);
    setIsOpen(false);
  }

  const navClassName = clsx(
    'flex flex-col overflow-hidden w-40',
    'sm:flex-row gap-2 sm:flex-wrap sm:w-auto',
    !isOpen && 'h-10',
  );

  const buttonsOpenCloseClassName = clsx('bg-blue-300', 'sm:hidden');

  return (
    <nav className={navClassName}>
      {!isOpen && (
        <Button className={buttonsOpenCloseClassName} onClick={() => setIsOpen((s) => !s)}>
          <MenuIcon />
          Menu
        </Button>
      )}
      {isOpen && (
        <Button className={buttonsOpenCloseClassName} onClick={() => setIsOpen((s) => !s)}>
          <CircleXIcon />
          Fechar
        </Button>
      )}
      <a href="/" target="_blank" className={`${buttonVariants({ variant: 'default' })} `}>
        <HomeIcon size={16} />
        Home
      </a>

      <Link href="/admin/post" className={buttonVariants({ variant: 'outline' })}>
        <ArrowUpSquareIcon size={16} />
        Posts
      </Link>

      <Link href="/admin/post/new" className={buttonVariants({ variant: 'secondary' })}>
        <PlusIcon size={16} />
        Criar Post
      </Link>
    </nav>
  );
}
