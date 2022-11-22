import Head from 'next/head';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import type { AppProps } from 'next/app';
import '../styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Next Entertainment</title>
        <meta
          name="description"
          content="View details of your favorite Movies and TV shows."
          key="desc"
        />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
