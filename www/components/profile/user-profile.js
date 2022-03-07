import { useSession } from "next-auth/react";
import Link from "next/link";

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
