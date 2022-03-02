import Head from "next/head";
import Link from "next/link";
import NewForm from "../../components/NewForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>Login Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div class="row">
        <div id="info-log" class="col-md-6 mx-auto rounded border border-white">
          <p>
            Check if connected to database:{" "}
            <Link href="/db">
              <a>Here!</a>
            </Link>
          </p>{" "}
          <NewForm></NewForm>
        </div>
      </div>
    </>
  );
}
