import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <nav>
      <Link href="/">
        <a className="logo">
          <Image src="/img/index.png" width={50} height={50} />
        </a>
      </Link>
      <Link href="/">
        <a className="title">Cryptosim</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <a>Log in</a>
      <a> Research</a>
    </nav>
  );
}

export default Navbar;
