import Head from 'next/head';
import Footer from '../components/distributed/footer/footer';
import Navbar from '../components/distributed/navbar/navbar';
import type { AppProps } from 'next/app';
import { Kalam } from '@next/font/google';
import '../styles/globals.scss';

const font = Kalam({
  subsets: ['latin'],
  weight: ['400'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={font.className}>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <title>Cinematica</title>
        <meta
          name="description"
          content="View details of your favorite movies and tv shows."
        />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
}
