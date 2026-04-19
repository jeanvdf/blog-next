'use server';

import { asyncDelay } from '@/utils/async-delay';

export async function deletePostAction(id: string) {
  // const id = formData.get('id');
  console.log('teste action delete id', id);
  await asyncDelay(2000);

  return id;
}
