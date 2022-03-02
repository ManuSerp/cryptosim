import Layout from "../component/layout";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
