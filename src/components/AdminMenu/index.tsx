'use client';

import clsx from 'clsx';
import { ArrowUpSquareIcon, CircleXIcon, HomeIcon, MenuIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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

  const linkClassName = clsx(
    'transition hover:bg-slate-300 px-4 border-b rounded-lg mb-4',
    'flex items-center gap-2 cursor-pointer',
  );

  const buttonsOpenCloseClassName = clsx(linkClassName, 'bg-blue-300');

  return (
    <nav className={navClassName}>
      {!isOpen && (
        <button className={buttonsOpenCloseClassName} onClick={() => setIsOpen((s) => !s)}>
          <MenuIcon />
          Menu
        </button>
      )}
      {isOpen && (
        <button className={buttonsOpenCloseClassName} onClick={() => setIsOpen((s) => !s)}>
          <CircleXIcon />
          Fechar
        </button>
      )}
      <a href="/" target="_blank" className={linkClassName}>
        <HomeIcon size={16} />
        Home
      </a>
      <Link href="/admin/post" className={linkClassName}>
        <ArrowUpSquareIcon size={16} />
        Posts
      </Link>
      <Link href="/admin/post/new" className={linkClassName}>
        <PlusIcon size={16} />
        Criar Post
      </Link>
    </nav>
  );
}
