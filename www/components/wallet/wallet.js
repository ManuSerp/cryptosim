import CoinCard from "./walletcontents";
import useSWR from "swr";
import { useSession } from "next-auth/react";

// export const coinfetcher= async(
//   url,payload)=>{
//     const options={
//       method:"POST" ,...CoinCard(payload&&{body:payload}),headers:{accept:"application/json","Content-Type":"application/json",},

//     };
//     return coinfetcher(url,options).then(r=>r.json());
//   }

// function App() {
//   const { data } = useSWR('/api/db/wallet', coinfetcher) // <--------------GET

//   return <>
//     <CoinCard coin={coin} amount={data.usd} />
//     <button onClick={() => {
//       fetch('/api/db/wallet', { method: 'POST', body:})  // <---POST
//     }}>update data</button>
//   </>
// }

// const showWalletContent = (coin, amount, pseudo) => {
//   const { data: session, status } = useSession();
//   const loading = status === "loading";

//   const { data, error } = useSWR("/api/db/wallet", searchWallet(pseudo), {
//     refreshInterval: 1000,
//   });

//   if (error) {
//     return <div>failed to load </div>;
//   }

//   if (!data) {
//     return <div>loading...</div>;
//   }
//   return <CoinCard coin={coin} amount={data.wlt} />;
// };

// export default function _Wallet() {
//   return (
//     <div className="wallet-body">
//       <div className="wallet-wrapper">
//         <div className="wallet-layout-row-1">Mon Wallet</div>
//         <div className="wallet-layout-row-2">
//           {WalletInfo.map(({ coin, amount }) =>
//             showWalletContent(coin, amount)
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

async function searchWallet(pseudo) {
  const response = await fetch("/api/db/wallet", {
    method: "POST",
    body: JSON.stringify({ pseudo }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

export default function Wallet() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  let data;
  let error;
  if (session) {
    [data, error] = useSWR("/api/db/wallet", searchWallet(session.user.name), {
      refreshInterval: 30000,
    });
    const wallet = [];
    let j = 0;
    for (i in data[0].wlt) {
      if (j > 1) {
        wallet.push({ coin: i, amount: data[0].wlt[i] });
      }
      j++;
    }
  }

  if (error) {
    return <div>failed to load </div>;
  }

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <div className="wallet-body">
      <div className="wallet-wrapper">
        <div className="wallet-layout-row-1">Mon Wallet</div>
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
