import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

function StatusWidget() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  function logoutHandler() {
    signOut();
  }

  return (
    <>
      {loading && <a>LOADING...</a>}
      {!session && !loading && (
        <a>
          <Link href="/auth">Login </Link>Anonymous
        </a>
      )}

      {session && (
        <a>
          <button onClick={logoutHandler}>Logout</button>{" "}
          <link href="/account/profile">{session.user.name}</link>
        </a>
      )}
    </>
  );
}

export default StatusWidget;
