import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Login Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container-fluid">
        <div id="test" className="d-flex flex-row">
          <p>
            Check if connected to database:{" "}
            <Link href="/db">
              <a>Here!</a>
            </Link>
          </p>
        </div>

        <div className="d-flex flex-row">
          <div className="p-2">Flex item 1</div>
          <div className="p-2">Flex item 2</div>
          <div className="p-2">Flex item 3</div>
        </div>
        <div className="d-flex flex-row-reverse">
          <div className="p-2">Flex item 1</div>
          <div className="p-2">Flex item 2</div>
          <div className="p-2">Flex item 3</div>
        </div>
      </div>
    </>
  );
}
