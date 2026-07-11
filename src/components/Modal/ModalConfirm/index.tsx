'use client';

import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';

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
  isVisible?: boolean;
  onConfirm: () => void;
};

export function ModalConfirm({ title, content, isVisible = true, onConfirm }: ModalConfirmProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (!isVisible) return;

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
      <AlertDialogTrigger
        render={
          <Button
            variant="destructive"
            className="text-red-500 cursor-pointer transition hover:scale-120 disabled:text-slate-400 disabled:cursor-not-allowed"
            size="icon"
          >
            <Trash2Icon />
          </Button>
        }
      />
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
