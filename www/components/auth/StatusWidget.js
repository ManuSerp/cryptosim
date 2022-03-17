import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

function StatusWidget() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  function logoutHandler() {
    signOut();
  }

  return (
    <div className="Login">
      {loading && <a>LOADING...</a>}
      {!session && !loading && (
        <button className="but-Login">
          <Link href="/auth">Login</Link>
        </button>
      )}

      {session && (
        <a>
          <Link href="/account/profile">{session.user.name}</Link>
          <button className="LogoutStatusWidget" onClick={logoutHandler}>
            Logout
          </button>
        </a>
      )}
    </div>
  );
}

export default StatusWidget;
