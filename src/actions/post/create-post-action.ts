'use server';

import { drizzleDb } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { PostCreateSchema } from '@/lib/post/validation';
import { makePartialPublicPost, PostModel, PublicPost } from '@/models/PostModel';
import { getZodErrorMessages } from '@/utils/get-zod-error-message';
import { makeSlugFromText } from '@/utils/make-slug-from-text';
import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { v4 as uuidV4 } from 'uuid';

type CreatePostActionType = {
  formState: PublicPost;
  errors: string[];
};

export async function createPostAction(
  prevState: CreatePostActionType,
  formData: FormData,
): Promise<CreatePostActionType> {
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

  await drizzleDb.insert(postsTable).values(newPost);
  updateTag('posts');

  redirect(`/admin/post/${newPost.id}`);
}
