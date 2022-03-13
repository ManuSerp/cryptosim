import { useSession } from "next-auth/react";

export default function UserLeaderBoard({ rank, name, balance }) {
  return (
    <>
      <div className="UserLeaderBoard">
        {rank}. {name} {balance}€
      </div>
    </>
  );
}
