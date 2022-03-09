import CoinCard from "./walletcontents";
import useSWR from "swr";


const coinlistjson = {
    btc: "bitcoin",
    eth: "ethereum",
    usd: "uniswap-state-dollar",
    usdt: "tether",
    bnb: "binancecoin",
    xrp: "ripple",
  };
  const coinlist = [];
  for (var c in coinlistjson) {
    coinlist.push(coinlistjson[c]);
  }
  
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
};

const showWalletContent = (coin,amount,pseudo) => {
    const { data, error } = useSWR("/api/db/wallet" + coin, searchWallet(pseudo), {
      refreshInterval: 1000,
    });
  
    if (error) {
      return <div>failed to load </div>;
    }
  
    if (!data) {
      return <div>loading...</div>;
    }
    return <CoinCard coin={coin} amount={data.usd} />;
  };

export default function Wallet() {
    const WalletInfo=[{ coin: "dogecoin", amount: 1000 },{coin:"bit", amount:1},{coin:"sha",amount:1}
    ];
    return( 
    <div className="wallet-body">
        <div className="wallet-wrapper">
        <div className="wallet-layout-row-1">
            Mon Wallet
        </div>
        <div className="wallet-layout-row-2">
            {WalletInfo.map(({ coin, amount }) => (
                showWalletContent(coin,amount)
            ))}
        </div>
        </div>
    </div>
    )
  }
  