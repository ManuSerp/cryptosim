import UserLeaderBoard from "./userleaderboard";
import useSWR from "swr";
import { useSession } from "next-auth/react";

/**
 * This fetches the Leaderboard data
 * @param {string} url 
 * @returns response from the API
 */
const fetcherLeaderBoard = async (url) => {
  const response = await fetch(url).then((response) => response.json());
  return response;
};

/**
 * This is the Leaderboard function that renders the Leaderboard
 */
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

  const Balance = () => {
    try {
      const b =
        Math.round(
          data.find(({ psd }) => psd == session.user.name).score * 1000
        ) / 1000;
      return b;
    } catch (error) {
      return 0;
    }
  };

  return (
    <div className="balance-leaderboard">
      <div className="LeaderBoard">
        <div className="balance">
          {loading && <a>LOADING...</a>}
          {!session && !loading && <div>Not Connected</div>}
          {session && (
            <div>
              Balance :{"  "}
              {Balance()}€
            </div>
          )}
        </div>
        <p>LeaderBoard :</p>
        {data.map(({ psd, score }, i) => (
          <UserLeaderBoard key={i} rank={i + 1} name={psd} balance={score} />
        ))}
      </div>
    </div>
  );
}
