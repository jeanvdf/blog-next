'use server';

import { PostCreateSchema } from '@/lib/post/validation';
import { makePartialPublicPost, PostModel } from '@/models/PostModel';
import { drizzlePostRepository } from '@/repositories';
import { getZodErrorMessages } from '@/utils/get-zod-error-message';
import { makeSlugFromText } from '@/utils/make-slug-from-text';
import { redirect } from 'next/navigation';
import { v4 as uuidV4 } from 'uuid';
import { PostActionState } from './types';
import { verifyLoginSession } from '@/lib/login/manage-login';

export async function createPostAction(
  prevState: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  const isAuthenticated = await verifyLoginSession();

  if (!(formData instanceof FormData)) {
    return {
      formState: {
        ...prevState.formState,
      },
      errors: ['Dados inválidos'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostCreateSchema.safeParse(formDataToObj);

  if (!isAuthenticated) {
    return {
      errors: ['Faça login novamente antes de salvar.'],
      formState: makePartialPublicPost(formDataToObj),
    };
  }

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error);

    return {
      errors: errors,
      formState: makePartialPublicPost(formDataToObj),
    };
  }

  const finalObj = zodParsedObj.data;
  const newPost: PostModel = {
    ...finalObj,
    id: uuidV4(),
    slug: makeSlugFromText(finalObj.title),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    await drizzlePostRepository.create(newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: newPost,
        errors: [e.message],
      };
    }
    return {
      formState: newPost,
      errors: ['Erro desconhecido.'],
    };
  }

  redirect(`/admin/post/${newPost.id}`);
}
