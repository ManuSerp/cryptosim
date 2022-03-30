import Transaction from "./transaction";
import useSWR from "swr";
import { useSession } from "next-auth/react";

const fetcherLeaderBoard = async (url) => {
  const response = await fetch(url).then((response) => response.json());
  return response;
};

export default function BoardHistory() {
  const { data, error } = useSWR("/api/db/history", fetcherLeaderBoard, {
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

  return (
    <div className="board-history">
      <div className="History">
        <div className="total">
          {loading && <a>LOADING...</a>}
          {!session && !loading && <div>Not Connected</div>}
          {session && (
            <div>
              Total transactions :{"  "}
              {data.length}
            </div>
          )}
        </div>
        <p>Hsitory :</p>
        {data.map(({ psd, achat, vente, q1, q2, vente }, i) => (
          <Transaction key={i} rank={i + 1} name={psd} balance={score} />
        ))}
      </div>
    </div>
  );
}
