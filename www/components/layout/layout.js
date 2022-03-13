import Navbar from "./navbar";
import Footer from "./footer";

function Layout({ children }) {
  return (
    <>
      <head>
        <title>Cryptosim</title>
      </head>

      <div className="layout-wrapper">
        <div className="layout-row-1">
          <Navbar />
        </div>
        <div className="layout-row-2">{children}</div>
        <div className="layout-row-3">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
