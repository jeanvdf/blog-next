import Link from 'next/link';

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="text-xl font-bold text-center pb-4">
      <p className="py-8">
        <span> Copyright &copy; - {YEAR} - </span>
        <Link className="hover:underline" href="/">
          The Blog
        </Link>
      </p>
    </footer>
  );
}
