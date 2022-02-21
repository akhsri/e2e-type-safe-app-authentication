import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { Fragment, useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {

  

  return (
    <Fragment>
      <Head>
        <script src="https://www.gstatic.com/firebasejs/7.13.1/firebase-app.js"></script>

        <script src="https://www.gstatic.com/firebasejs/7.13.1/firebase-analytics.js"></script>
      </Head>
      <Component {...pageProps} />
    </Fragment>
  )
}
export default MyApp
