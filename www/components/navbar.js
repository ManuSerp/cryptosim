import Image from "next/image";
import Link from "next/link";
import StatusWidget from "./auth/StatusWidget";

function Navbar() {
  return (
    <nav>
      <Link href="/">
        <a className="nav-logo">
          <Image src="/img/index.png" width={50} height={50} />
        </a>
      </Link>
      <Link href="/">
        <a className="nav-title">Cryptosim </a>
      </Link>
      <Link href="/about">
        <a className="nav-about">About</a>
      </Link>

      <a className="nav-search"> Research</a>
      <StatusWidget />
    </nav>
  );
}

export default Navbar;