import { useSession } from "next-auth/react";
import Link from "next/link";

/**
 * This is the function that fetches the user data from the API
 * @returns {JSX}
 */
function UserProfile() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <>
      {loading && <a>LOADING...</a>}
      {!session && !loading && <a>ERROR</a>}

      {session && <a>{session.user.name}</a>}

      {session.user.name == "admin" && (
        <a>
          {" "}
          <Link href="/admin/root">admin page</Link>
        </a>
      )}
    </>
  );
}

export default UserProfile;
