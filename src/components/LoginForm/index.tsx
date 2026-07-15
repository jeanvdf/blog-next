'use client';

import { loginAction, StateLoginActionProps } from '@/actions/login/login-action';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { LogInIcon } from 'lucide-react';
import { useActionState, useState } from 'react';
import { toast } from 'react-toastify';

export function LoginForm() {
  const initialState = {
    username: '',
    error: '',
  };
  const [state, action, isPending] = useActionState(
    async (prevState: StateLoginActionProps, formData: FormData) => {
      const result = await loginAction(prevState, formData);

      toast.dismiss();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success('Login realizado com sucesso!');
      }
      return result;
    },
    initialState,
  );
  const [form, setForm] = useState(state.username);

  return (
    <form action={action} className="w-full max-w-xs mx-auto mb-16">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="username">Login</FieldLabel>
          <Input
            name="username"
            id="username"
            type="text"
            placeholder="Digite seu login"
            value={form}
            onChange={(e) => setForm(e.target.value)}
            disabled={isPending}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="••••••••"
            disabled={isPending}
          />
        </Field>
        <Field orientation="horizontal" className="justify-center">
          <Button type="reset" variant="outline" disabled={isPending}>
            Reset
          </Button>
          <Button type="submit" disabled={isPending}>
            <LogInIcon />
            Submit
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
