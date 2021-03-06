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
  
  console.log(data);
  return (
    <div className="board-history">
      <div className="History">
        <div className="total">
        <p>History</p>
          {loading && <a>LOADING...</a>}
          {!session && !loading && <div>Not Connected</div>}
          {session && (
            <div>
              Total transactions :{"  "}
              {data.length}
            </div>
          )}
        </div>
        {data.map(({ achat, vente, q1, q2, date }, i) => (
          <Transaction  achat={achat} vente={vente} q1={q1} q2={q2} date={date}/>
        ))}
      </div>
    </div>
  );
}
