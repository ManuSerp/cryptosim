import Image from "next/image";
import { useState } from "react";
import Popupbuy from "../popups/popupbuy";
import Popupsell from "../popups/popupsell";
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
        <div data-modalbuy-target="#modalbuy" className="buy" type="button" onClick={submitBuy}>
          Buy
          <Popupbuy/>
        </div>
        <div data-modalsell-target="#modalsell" className="sell" type="button" onClick={submitSell}>
          Sell
          <Popupsell/>
        </div>
      </div>
    </div>
  );
}
