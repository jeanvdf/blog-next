import ErrorMessage from '@/components/ErrorMessage';
import { LoginForm } from '@/components/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default async function AdminLoginPage() {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return (
      <ErrorMessage
        contentTitle="403"
        contentDescription="Libere o sistema de login usando ALLOW_LOGIN"
      />
    );
  }
  return <LoginForm />;
}
