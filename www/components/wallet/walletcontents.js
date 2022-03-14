
export default function CoinCard({ coin, amount }) {
  return (
    <div className="CoinPrice">
      <div className="left">
        logo
      </div>
      <div className="right">
        {coin} {amount} 
      </div>
    </div>
  );
}