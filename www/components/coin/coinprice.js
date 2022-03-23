import Image from "next/image";
import { useState } from "react";
import Pricechart from "./pricechart";
import { useAlert } from "react-alert";

export default function CoinPrice({ name, value, index }) {
  const [text, setText] = useState("");
  const [dayInter, setDayInter] = useState(1);
  const alert = useAlert();

  const submitBuy = async () => {
    const url = "/api/trade/" + name + "/eur/" + text;
    const response = await fetch(url);
    if (response.ok) {
      alert.show("Transaction successful !", { type: "success" });
    } else {
      alert.show("Transaction failed !", { type: "error" });
    }
    setText("");
  };

  const submitSell = async () => {
    const url = "/api/trade/sell/" + name + "/eur/" + text;
    const response = await fetch(url);
    if (response.ok) {
      alert.show("Transaction successful !", { type: "success" });
    } else {
      alert.show("Transaction failed !", { type: "error" });
    }
    setText("");
  };

  const img_url = "/img/" + name + ".png";
  return (
    <div className="CoinPrice">
      <div className="left">
        <div className="top-chart">
          <div className="info">
            <Image src={img_url} width={25} height={25} />
            {name} {value} €
          </div>
          <div className="timeSlider">
            <div
              id="but-hour"
              className="time-but"
              type="button"
              onClick={() => {
                setDayInter(0.0417);
              }}
            >
              1H
            </div>
            <div
              id="but-day"
              className="time-but"
              type="button"
              onClick={() => {
                setDayInter(1);
              }}
            >
              24H
            </div>
            <div
              id="but-week"
              className="time-but"
              type="button"
              onClick={() => {
                setDayInter(7);
              }}
            >
              1W
            </div>
            <div
              id="but-month"
              className="time-but"
              type="button"
              onClick={() => {
                setDayInter(31);
              }}
            >
              1M
            </div>
            <div
              id="but-year"
              className="time-but"
              type="button"
              onClick={() => {
                setDayInter(365);
              }}
            >
              1Y
            </div>
          </div>
        </div>
        <div className="chart">
          <Pricechart
            name={name}
            vs={"eur"}
            index={index}
            dayInter={dayInter}
          />
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
