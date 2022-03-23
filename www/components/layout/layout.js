import Navbar from "./navbar";
import Head from "next/head";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Cryptosim</title>
        <link rel="icon" href="/img/cryptos.png" />
      </Head>
      <div className="content">
        <div className="layout-wrapper">
          <div className="layout-row-1">
            <Navbar />
          </div>
          <div className="layout-row-2">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
