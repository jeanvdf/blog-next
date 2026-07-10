'use client';

import { Trash2Icon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { ModalConfirm } from '../Modal/ModalConfirm';
import { deletePostAction } from '@/actions/delete-post-action';

type DeleteButtonProps = {
  title: string;
  id: string;
};

export function DeleteButton({ title, id }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);
  async function handleClick() {
    setShowDialog(true);
  }
  function handleConfirm() {
    startTransition(async () => {
      const result = await deletePostAction(id);
      alert(`O result foi ${result.error}`);
      setShowDialog(false);
    });
  }

  function handleCancel() {
    setShowDialog(false);
  }

  return (
    <>
      <button
        className="text-red-500 cursor-pointer transition hover:scale-120 disabled:text-slate-400 disabled:cursor-not-allowed"
        aria-label={`Apagar post: ${title}`}
        title={`Apagar post: ${title}`}
        onClick={handleClick}
        disabled={isPending}
      >
        <Trash2Icon size={18} />
      </button>
      {showDialog && (
        <ModalConfirm
          title="Deseja continuar?"
          content={`Ao prosseguir o post ${title} será excluido`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          disabled={isPending}
        />
      )}
    </>
  );
}
