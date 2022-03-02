

import { SessionProvider } from "next-auth/react";

import Layout from "../components/layout";


import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
</SessionProvider>

  );
}
