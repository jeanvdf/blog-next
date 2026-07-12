'use client';

import { deletePostAction } from '@/actions/post/delete-post-action';
import { toast } from 'react-toastify';
import { ModalConfirm } from '../Modal/ModalConfirm';
import { Button } from '../ui/button';
import { Trash2Icon } from 'lucide-react';

type DeleteButtonProps = {
  title: string;
  id: string;
};

export function DeleteButton({ title, id }: DeleteButtonProps) {
  async function handleConfirm() {
    const result = await deletePostAction(id);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success('Post deletado com sucesso.');
  }

  return (
    <ModalConfirm
      title="Deseja continuar?"
      content={`Ao prosseguir o post ${title} será excluido`}
      onConfirm={handleConfirm}
    >
      <Button
        variant="destructive"
        className="text-red-500 cursor-pointer transition hover:scale-120 disabled:text-slate-400 disabled:cursor-not-allowed"
        size="icon"
      >
        <Trash2Icon />
      </Button>
    </ModalConfirm>
  );
}
