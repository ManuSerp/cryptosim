import Image from "next/image";
import { useState } from "react";
import Buy from "./buy";
import Sell from "./sell";

export default function CoinPrice({ name, value }) {
  const [text, setText] = useState("");

  const submitBuy = async () => {
    const url = "/api/trade/" + name + "/usd/" + text;
    const response = await fetch(url);
  };

  const submitSell = async () => {
    const url = "/api/trade/" + "/usd/" + name + "/" + text;
    const response = await fetch(url);
  };

  return (
    <div className="CoinPrice">
      <div className="left">
        <div className="info">
          {name} {value} $
        </div>
        <Image src="/img/ex.png" width={600} height={400} />
      </div>
      <div className="right">
        <form>
          <p>Quantité</p>
          <input
            type="text"
            name="quantite"
            id="quantite"
            placeholder="Amount to trade"
            size="80%"
            onChange={(e) => setText(e.target.value)}
          />
        </form>
        <div className="buy" type="button" onClick={submitBuy}>
          Buy
        </div>
        <div className="sell" type="button" onClick={submitSell}>
          Sell
        </div>
      </div>
    </div>
  );
}
