import { getSession } from "next-auth/react";

import UserProfile from "../../components/profile/user-profile";
import Wallet from "../../components/wallet/wallet";

function ProfilePage() {
  return (
    <div>
      <UserProfile />
      <Wallet />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
