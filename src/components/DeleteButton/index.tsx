'use client';

import { deletePostAction } from '@/actions/delete-post-action';
import { toast } from 'react-toastify';
import { ModalConfirm } from '../Modal/ModalConfirm';

type DeleteButtonProps = {
  title: string;
  id: string;
};

export function DeleteButton({ title, id }: DeleteButtonProps) {
  async function handleConfirm() {
    const result = await deletePostAction(id);

    if (result.error) {
      toast.error(result.error);
      throw new Error(result.error);
    }

    toast.success('Post deletado com sucesso.');
  }

  return (
    <ModalConfirm
      title="Deseja continuar?"
      content={`Ao prosseguir o post ${title} será excluido`}
      onConfirm={handleConfirm}
    />
  );
}
