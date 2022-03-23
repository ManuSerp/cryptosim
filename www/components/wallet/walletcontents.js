import Image from "next/image";

export default function CoinCard({ coin, amount }) {
  const img_url = "/img/" + coin + ".png";
  return (
    <div className="coin-card">
      <Image src={img_url} width={25} height={25} />
      <span>
        {coin} : {Math.round(amount * 10000) / 10000}
      </span>
    </div>
  );
}
