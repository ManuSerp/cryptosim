import CoinPrice from "./coinprice";
import useSWR from "swr";

const fetcherCoin = async (url) => {
  const response = await fetch(url).then((response) => response.json());
  return response;
};

export default function CoinList() {
  const coinlist = [{ name: "bitcoin", value: 0 }];

  const { data, error } = useSWR("/api/crypto/bitcoin", fetcherCoin, {
    refreshInterval: 10000,
  });

  if (error) {
    return <div>failed to load </div>;
  }

  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <div className="CoinList">
      <p>Stock Price :</p>
      {coinlist.map(({ name, value }, i) => (
        <CoinPrice key={i} name={name} value={data.eur} />
      ))}
    </div>
  );
}
