import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

function StatusWidget() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  function logoutHandler() {
    signOut();
  }

  return (
    <div>
      {loading && <p>LOADING...</p>}
      {!session && !loading && <Link href="/auth">Login</Link>}
      {!session && !loading && <p>Anonymous</p>}
      {session && <button onClick={logoutHandler}>Logout</button>}
      {session && <p>pseudo</p>}
    </div>
  );
}

export default StatusWidget;
