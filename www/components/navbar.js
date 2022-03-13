import Image from "next/image";
import Link from "next/link";
import StatusWidget from "./auth/StatusWidget";

function Navbar() {
  return (
    <nav>
      <div className="nav-left">
        <Link href="/">
          <a className="nav-logo">
            <Image src="/img/cryptos.png" width={50} height={50} />
          </a>
        </Link>
        <Link href="/">
          <a className="nav-title">Cryptosim </a>
        </Link>
      </div>
      <div className="nav-right">
        <Link href="/about">
          <a className="nav-about">About</a>
        </Link>

        <StatusWidget />
      </div>
    </nav>
  );
}

export default Navbar;
