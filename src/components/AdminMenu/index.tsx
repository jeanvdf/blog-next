'use client';

import logout from '@/actions/login/logout-action';
import clsx from 'clsx';
import {
  ArrowUpSquareIcon,
  CircleXIcon,
  HomeIcon,
  HourglassIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Button, buttonVariants } from '../ui/button';

export function AdminMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const [prevPathName, setPrevPathName] = useState(pathName);
  const [isPending, startTransition] = useTransition();

  if (pathName !== prevPathName) {
    setPrevPathName(pathName);
    setIsOpen(false);
  }

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    startTransition(async () => {
      await logout();
    });
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
      <Link href="/" onClick={handleLogout} className={buttonVariants({ variant: 'secondary' })}>
        {isPending && (
          <>
            <HourglassIcon /> Aguarde...
          </>
        )}
        {!isPending && (
          <>
            <LogOutIcon size={16} />
            Sair
          </>
        )}
      </Link>
    </nav>
  );
}
