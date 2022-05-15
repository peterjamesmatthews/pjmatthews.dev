import "../styles/global.scss";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Peter Matthews</title>
        <meta name="description" content="pjmatthews.dev" />
        <link rel="icon" href="/wave.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
