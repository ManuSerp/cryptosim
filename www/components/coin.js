export default function CoinCard({ coin, amount }) {
    return (
      <div className="coin-card">
        {coin}: {amount}
      </div>
    );
  }
  