import CoinPrice from "./coinprice";

export default function CoinList() {
  const coinlist = [
    { name: "BTC", value: 100 },
    { name: "ETH", value: 1000 },
  ];
  return (
    <div className="CoinList">
      <p>Stock Price :</p>
      {coinlist.map(({ name, value }, i) => (
        <CoinPrice key={i} name={name} value={value} />
      ))}
    </div>
  );
}
