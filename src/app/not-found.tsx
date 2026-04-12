import ErrorMessage from '@/components/ErrorMessage';

export default function NotFoundPage() {
  return (
    <ErrorMessage
      title="Página não encontrada."
      contentTitle="404"
      contentDescription="Erro 404 - Esta página não foi encontrada."
    />
  );
}
