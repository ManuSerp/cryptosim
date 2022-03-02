import Balance from "../components/balance";
import LeaderBoard from "../components/leaderboard";
import StockPriceList from "../components/stockpricelist";

export default function Home() {
  return (
    <div className="content">
      <div className="index-wrapper">
        <div className="index-left">
          <div className="index-left-row-1">
            <Balance />
          </div>
          <div className="index-left-row-2">
            <LeaderBoard />
          </div>
        </div>
        <div className="index-right">
          <StockPriceList />
        </div>
      </div>
    </div>
  );
}
