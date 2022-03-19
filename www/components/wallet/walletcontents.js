export default function CoinCard({ coin, amount }) {
  return (
    <div className="CoinPrice">
      {coin} : {Math.round(amount * 10000) / 10000}
    </div>
  );
}
