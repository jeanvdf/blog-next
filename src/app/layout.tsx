import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import './globals.css';
import { Footer } from '@/components/Footer';

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
    <html lang="pt-BR">
      <body>
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
      </body>
    </html>
  );
}
