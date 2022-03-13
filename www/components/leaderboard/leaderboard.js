import UserLeaderBoard from "./userleaderboard";
import useSWR from "swr";

const fetcherLeaderBoard = async (url) => {
  const response = await fetch(url).then((response) => response.json());
  return response;
};

export default function LeaderBoard() {
  const { data, error } = useSWR("/api/db/leader_board", fetcherLeaderBoard, {
    refreshInterval: 30000,
  });

  if (error) {
    return <div>failed to load </div>;
  }

  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <div className="LeaderBoard">
      <p>LeaderBoard :</p>
      {data.map(({ psd, score }, i) => (
        <UserLeaderBoard key={i} rank={i} name={psd} balance={score} />
      ))}
    </div>
  );
}
