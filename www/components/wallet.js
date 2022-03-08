import CoinCard from "./coin";
import coin from "./coin";

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
  