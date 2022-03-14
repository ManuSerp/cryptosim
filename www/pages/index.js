import BalanceLeaderBoard from "../components/leaderboard/balance-leaderboard";

import CoinList from "../components/coin/coinlist";

import Wallet from "../components/wallet/wallet";

export default function Home() {
  return (
    <div className="content">
      <div className="index-wrapper">
        <div className="index-left">
          <div className="index-left-row-1">
            <Wallet />
          </div>
          <div className="index-left-row-2">
            <BalanceLeaderBoard />
          </div>
        </div>
        <div className="index-right">
          <div className="index-right-col-left">
            <CoinList />
          </div>
          <div className="index-right-col-right"></div>
        </div>
      </div>
    </div>
  );
}
