'use client';

import { deletePostAction } from '@/actions/delete-post-action';
import { Trash2Icon } from 'lucide-react';
import { useTransition } from 'react';

type DeleteButtonProps = {
  title: string;
  id: string;
};

export function DeleteButton({ title, id }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  async function handleClick() {
    startTransition(async () => {
      const result = await deletePostAction(id);
      console.log('result', result);
    });
  }

  return (
    <button
      className="text-red-500 cursor-pointer transition hover:scale-120 disabled:text-slate-400 disabled:cursor-not-allowed"
      aria-label={`Apagar post: ${title}`}
      title={`Apagar post: ${title}`}
      onClick={handleClick}
      disabled={isPending}
    >
      <Trash2Icon size={18} />
    </button>
  );
}
