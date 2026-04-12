import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDateTime(strDate: string): string {
  const date = new Date(strDate);

  if (isNaN(date.getTime())) {
    return '';
  }
  return format(date, "dd/MM/yyyy 'às' HH'h'mm", { locale: ptBR });
}

export function formatRelativeDateTime(strDate: string): string {
  const date = new Date(strDate);
  return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
}
