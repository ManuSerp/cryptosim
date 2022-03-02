
import LeaderBoard from "../component/leaderboard";
import StockPriceList from "../component/stockpricelist";

export default function Home() {
  return (
    <div className="content">
      <LeaderBoard />
      <StockPriceList />
    </div>
  );
}
