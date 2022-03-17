export default function CoinCard({ coin, amount }) {
  return (
    <div className="CoinPrice">
      {coin} : {amount}
    </div>
  );
}
