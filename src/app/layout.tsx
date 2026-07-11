import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import './globals.css';
import { Footer } from '@/components/Footer';
import { ToastifyContainer } from '@/components/ToastifyContainer';
import { Geist } from 'next/font/google';
import { cn } from '@/lib/utils';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: {
    template: '%s | Tech Blog',
    default: 'Tech Blog',
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-BR" className={cn('font-sans', geist.variable)}>
      <body>
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
        <ToastifyContainer />
      </body>
    </html>
  );
}
