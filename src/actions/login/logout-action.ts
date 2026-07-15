import { deleteLoginSession } from '@/lib/login/manage-login';
import { asyncDelay } from '@/utils/async-delay';
import { redirect } from 'next/navigation';

export default async function logout() {
  await asyncDelay(1000);

  await deleteLoginSession();
  redirect('/admin/login');
}
