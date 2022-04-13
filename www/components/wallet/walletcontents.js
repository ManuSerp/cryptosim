import Image from "next/image";

/**
 * The CoinCard component renders a single coin card
 * @param {string} coin - The coin name
 * @param {number} amount- The value of the coin
 */
export default function CoinCard({ coin, amount }) {
  const img_url = "/img/" + coin + ".png";
  return (
    <div className="coin-card">
      <Image src={img_url} width={25} height={25} />
      <span>
        {coin} :{" "}
        <span id={"#value-" + coin}>{Math.round(amount * 10000) / 10000}</span>
      </span>
    </div>
  );
}
