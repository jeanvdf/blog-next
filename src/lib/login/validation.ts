import { z } from 'zod';

export const LoginSchema = z.object({
  username: z.string().trim().min(1, 'Digite o usuário e a senha.'),
  password: z.string().min(1, 'Digite o usuário e a senha.'),
});
