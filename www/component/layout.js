import Navbar from "./navbar";
import Footer from "./footer";

function Layout({ children }) {
  return (
    <div>
      <head>
        <title>Cryptosim</title>
      </head>
      <div className="body">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
