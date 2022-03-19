import Navbar from "./navbar";
import Footer from "./footer";

function Layout({ children }) {
  return (
    <div className="content">
      <head>
        <title>Cryptosim</title>
      </head>

      <div className="layout-wrapper">
        <div className="layout-row-1">
          <Navbar />
        </div>
        <div className="layout-row-2">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
