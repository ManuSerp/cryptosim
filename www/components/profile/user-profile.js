import { useSession } from "next-auth/react";

function UserProfile() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <>
      {loading && <a>LOADING...</a>}
      {!session && !loading && <a>ERROR</a>}

      {session && <a>{session.user.name}</a>}
    </>
  );
}

export default UserProfile;
