import Head from "next/head";
import "../styles/globals.css";
import "../styles/main.css";
import "../styles/main.min.css";
import "../styles/bulma/bulma.min.css";
import "../styles/bulma/main.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
