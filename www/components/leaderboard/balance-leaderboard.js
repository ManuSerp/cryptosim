import UserLeaderBoard from "./userleaderboard";
import useSWR from "swr";
import { useSession } from "next-auth/react";

const fetcherLeaderBoard = async (url) => {
  const response = await fetch(url).then((response) => response.json());
  return response;
};

export default function BalanceLeaderBoard() {
  const { data, error } = useSWR("/api/db/leader_board", fetcherLeaderBoard, {
    refreshInterval: 30000,
  });
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (error) {
    return <div>failed to load </div>;
  }

  if (!data) {
    return <div>loading...</div>;
  }
  const balance = data.find(({ psd }) => psd == session.user.name).score;
  return (
    <div className="balance-leaderboard">
      <div className="LeaderBoard">
        <p>LeaderBoard :</p>
        {data.map(({ psd, score }, i) => (
          <UserLeaderBoard key={i} rank={i} name={psd} balance={score} />
        ))}
      </div>
    </div>
  );
}
