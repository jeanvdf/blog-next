'use server';

import { createLoginSession, verifyPassword } from '@/lib/login/manage-login';
import { LoginSchema } from '@/lib/login/validation';
import { asyncDelay } from '@/utils/async-delay';
import { redirect } from 'next/navigation';

export type StateLoginActionProps = {
  username: string;
  error: string;
};

export async function loginAction(state: StateLoginActionProps, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return {
      username: '',
      error: 'Login not allowed',
    };
  }
  await asyncDelay(3000);

  if (!(formData instanceof FormData)) {
    return {
      username: '',
      error: 'Dados inválidos',
    };
  }
  const parsed = LoginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    return {
      username: '',
      error: 'Digite o usuário e a senha.',
    };
  }

  const { username, password } = parsed.data;

  // Aqui eu checaria se o usuário existe na base de dados
  const isUsernameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = await verifyPassword(password, process.env.LOGIN_PASSWORD || '');

  if (!isUsernameValid || !isPasswordValid) {
    return {
      username: '',
      error: 'Usuário ou senha inválidos.',
    };
  }

  await createLoginSession(username);
  redirect('/admin/post');
}
