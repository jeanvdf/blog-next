'use server';

export async function revalidate(formData: FormData) {
  const path = formData.get('path') as string;
  console.log('teste path', path);
}
