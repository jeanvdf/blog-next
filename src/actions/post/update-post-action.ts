'use server';

import { PostUpdateSchema } from '@/lib/post/validation';
import { makePartialPublicPost, makePublicPost } from '@/models/PostModel';
import { drizzlePostRepository } from '@/repositories';
import { getZodErrorMessages } from '@/utils/get-zod-error-message';
import { updateTag } from 'next/cache';
import { PostActionState } from './types';

export async function updatePostAction(
  prevState: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  if (!(formData instanceof FormData)) {
    return {
      formState: {
        ...prevState.formState,
      },
      errors: ['Dados inválidos'],
    };
  }

  const id = formData.get('id')?.toString();

  if (!id || typeof id !== 'string') {
    return {
      formState: {
        ...prevState.formState,
      },
      errors: ['ID inválido.'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostUpdateSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error);

    return {
      errors: errors,
      formState: makePartialPublicPost(formDataToObj),
    };
  }

  const finalObj = zodParsedObj.data;
  const newPost = {
    ...finalObj,
  };

  let post;
  try {
    post = await drizzlePostRepository.update(id, newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialPublicPost(formDataToObj),
        errors: [e.message],
      };
    }
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ['Erro desconhecido.'],
    };
  }

  updateTag(`post-${post.slug}`);
  updateTag('posts');
  return {
    formState: makePublicPost(post),
    errors: [],
    success: true,
  };
}
