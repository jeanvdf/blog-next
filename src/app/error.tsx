'use client';

import ErrorMessage from '@/components/ErrorMessage';
import { useEffect } from 'react';

type RootErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function RootErrorPage({ error }: RootErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorMessage
      title={`Erro inesperado ${error.name}`}
      contentTitle="500"
      contentDescription={`Erro 500 - Ocorreu um erro inesperado. ${error.message}`}
    />
  );
}
