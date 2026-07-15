'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState, useTransition } from 'react';

export type ModalConfirmProps = {
  title: string;
  content: string;
  onConfirm: () => void;
  children: React.ReactElement;
};

export function ModalConfirm({ title, content, onConfirm, children }: ModalConfirmProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleConfirm() {
    startTransition(async () => {
      try {
        onConfirm();
        setOpen(false);
      } catch {}
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={children} />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel autoFocus variant="outline" disabled={isPending}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={isPending} variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
