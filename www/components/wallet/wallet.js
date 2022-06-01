import CoinCard from "./walletcontents";
import useSWR from "swr";
import { useSession } from "next-auth/react";


/** 
 * This is the function that fetches the data from the API 
 * @param {string} url - The url to fetch
 */
async function searchWallet(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

/**
 * This is the Wallet function that renders the wallet 
 */
export default function Wallet() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const { data, error } = useSWR("/api/db/wlt/wallet_auth", searchWallet, {
    refreshInterval: 30000,
  });

  if (error) {
    return <div>failed to load </div>;
  }

  if (!data) {
    return <div>loading...</div>;
  }

  const wallet = [];
  let j = 0;
  for (let i in data.wlt) {
    if (j > 1) {
      wallet.push({ coin: i, amount: data.wlt[i] });
    }
    j++;
  }

  return (
    <div className="wallet-body">
      <div className="wallet-wrapper">
        <div className="wallet-layout-row-1">My Wallet</div>
        <div className="wallet-layout-row-2">
          {loading && <a>LOADING...</a>}
          {!session && !loading && <div>Not Connected</div>}
          {session && (
            <div>
              {wallet.map(({ coin, amount }, i) => {
                return <CoinCard key={i} coin={coin} amount={amount} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
