import { getSession } from "next-auth/react";

function AdminPage() {
  return (
    <>
      <div>ADMIN PAGE</div>
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
