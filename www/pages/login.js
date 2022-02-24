import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Login Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="login-wrap">
        <p>
          Check if connected to database:{" "}
          <Link href="/db">
            <a>Here!</a>
          </Link>
        </p>
      </div>
    </>
  );
}
