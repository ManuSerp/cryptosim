import Navbar from "./navbar";
import Footer from "./footer";

function Layout({ children }) {
  return (
    <div className="content">
      <head>
        <title>Cryptosim</title>
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </div>
  );
}

export default Layout;
