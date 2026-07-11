import { AdminMenu } from '@/components/AdminMenu';

type AdminPostLayoutProps = {
  children: React.ReactNode;
};

export default function AdminPostLayout({ children }: Readonly<AdminPostLayoutProps>) {
  return (
    <>
      <AdminMenu />
      {children}
    </>
  );
}
