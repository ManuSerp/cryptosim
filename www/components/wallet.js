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
  


const fetcher = async (url) => {
    const response = await fetch(url).then((response) => response.json());
    return response;
  };

const showWalletContent = (i, name) => {
    const { data, error } = useSWR("/api/db/" + name, fetcher, {
      refreshInterval: 10000,
    });
  
    if (error) {
      return <div>failed to load </div>;
    }
  
    if (!data) {
      return <div>loading...</div>;
    }
    return <CoinPrice key={i} name={name} value={data.usd} />;
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
            <p>Valeurs</p>
            {WalletInfo.map(({ coin, amount }) => (
                <CoinCard coin={coin} amount={amount} />
            ))}
        </div>
        </div>
    </div>
    )
  }
  