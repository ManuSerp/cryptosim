import CoinPrice from "./coinprice";
import useSWR from "swr";

const coinlistjson = require("../data/symbols.json");
const coinlist = [];
for (var c in coinlistjson) {
  coinlist.push(c);
}

const fetcherCoin = async (url) => {
  const response = await fetch(url).then((response) => response.json());
  return response;
};

const showCoinprice = (i, name) => {
  const { data, error } = useSWR("/api/crypto/" + name, fetcherCoin, {
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

export default function CoinList() {
  return (
    <div className="CoinList">
      <p>Stock Price :</p>
      {coinlist.map((name, i) => showCoinprice(i, name))}
    </div>
  );
}
