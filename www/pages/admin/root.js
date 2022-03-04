import { getSession } from "next-auth/react";
import WalletSeeker from "../../components/admin/walletSeeker";

function AdminPage() {
  return (
    <>
      <div>ADMIN PAGE</div>
      <div>
        <WalletSeeker></WalletSeeker>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session || session.user.name !== "admin") {
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

export default AdminPage;
