import Link from 'next/link';

export function Header() {
  return (
    <header>
      <h1
        className="text-4xl/normal font-extrabold text-center py-8
        sm:text-5xl/normal sm:py-12
        md:text-6xl/normal md:py-14
        lg:text-7xl/normal lg:py-16
        xl:text-8xl/normal xl:py-18"
      >
        <Link href="#">Tech Lead</Link>
      </h1>
    </header>
  );
}
