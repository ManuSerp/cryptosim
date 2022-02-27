import Layout from "../component/layout";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import "../styles/navbar.css";
import "../styles/footer.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
