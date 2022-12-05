import Head from 'next/head';
import Footer from '../components/distributed/footer/footer';
import Navbar from '../components/distributed/navbar/navbar';
import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import '@fontsource/josefin-sans';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Next Entertainment</title>
        <meta
          name="description"
          content="View details of your favorite movies and tv shows."
        />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
