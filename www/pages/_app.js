
import { SessionProvider } from "next-auth/react";

import Layout from "../components/layout";

import "../styles/globals.css";
import "../styles/navbar.css";
import "../styles/footer.css";
import "../styles/index.css";
import "../styles/leaderboard.css";
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
