import { Button } from '@/components/ui/button';
import { ArrowUpIcon, Trash2Icon } from 'lucide-react';

export default async function AdminPostNewPage() {
  return (
    <div>
      <Button size="xs">Clique aqui</Button>
      <Button size="lg" variant="destructive">
        Excluir
      </Button>
      <Button disabled size="lg" variant="destructive">
        <Trash2Icon />
        Excluir
      </Button>
      <Button size="default" variant="outline">
        Cancelar
      </Button>
      <Button size="default" variant="secondary">
        Secondary
      </Button>
      <Button size="icon" variant="ghost">
        <ArrowUpIcon />
      </Button>
    </div>
  );
}
