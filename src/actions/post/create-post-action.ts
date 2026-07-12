'use server';

import { PublicPost } from '@/models/PostModel';

type CreatePostActionType = {
  formState: PublicPost;
  errors: string[];
};

export async function createPostAction(
  prevState: CreatePostActionType,
  formData: FormData,
): Promise<CreatePostActionType> {
  const title = formData.get('title')?.toString() || '';
  const published = true;
  return {
    formState: {
      ...prevState.formState,
      title,
      published,
    },
    errors: [],
  };
}
