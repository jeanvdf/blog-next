/**
 * FormData.get() retorna `string | File | null`. Esta função garante uma string,
 * evitando a conversão implícita de File para '[object Object]'.
 */
export const getFormString = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
};
