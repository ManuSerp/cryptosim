import Image from "next/image";
import { useState } from "react";
import Pricechart from "./pricechart";

export default function CoinPrice({ name, value, index }) {
  const [text, setText] = useState("");

  const submitBuy = async () => {
    const url = "/api/trade/" + name + "/eur/" + text;
    const response = await fetch(url);
    setText("");
  };

  const submitSell = async () => {
    const url = "/api/trade/" + "eur/" + name + "/" + text;
    const response = await fetch(url);
    setText("");
  };

  const img_url = "/img/" + name + ".png";
  return (
    <div className="CoinPrice">
      <div className="left">
        <div className="info">
          <Image src={img_url} width={25} height={25} />
          {name} {value} €
        </div>
        <div className="chart">
          <Pricechart name={name} index={index} />
        </div>
      </div>
      <div className="right">
        <form>
          <p>Trade :</p>
          <input
            type="text"
            name="quantite"
            id="quantite"
            placeholder="Amount to trade"
            size="80%"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>

        {!isNaN(parseFloat(text)) && (
          <div className="converter">
            ={">"} {value * parseFloat(text)}€
          </div>
        )}

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
