import { revalidate } from '@/actions/revalidate-action';

export default async function Exemplo({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <main>
      <div>
        <h1>Exemplo de Página Estática</h1>
        <p>Esta página é renderizada estaticamente. ID: {id}</p>
      </div>
      <form className="py-16" action={revalidate}>
        <input type="hidden" name="path" defaultValue={`/exemplo/${id}`} />
        <button
          className="bg-amber-500 text-white hover:bg-amber-700 cursor-pointer rounded p-2"
          type="submit"
        >
          REVALIDAR
        </button>
      </form>
    </main>
  );
}
