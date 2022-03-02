import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

function MainNavigation() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  function logoutHandler() {
    signOut();
  }

  return (
    <header>
      <Link href="/">
        <a>
          <div>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {loading && (
            <li>
              <p>LOADING...</p>
            </li>
          )}
          {!session && !loading && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
