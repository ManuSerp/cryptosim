import Image from "next/image";
import { useState } from "react";
import Pricechart from "./pricechart";
import { useAlert } from "react-alert";

export default function CoinPrice({ name, value, index }) {
  const [text, setText] = useState("");
  const [dayInter, setDayInter] = useState(1);
  const [firstPrice, setFirstPrice] = useState(value);
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

  const css_percent = (value) => {
    if (value >= 0) {
      return {
        color: "green",
        content: "+",
      };
    } else {
      return {
        color: "red",
      };
    }
  };

  const css_but = (but) => {
    if (but === dayInter) {
      return {
        backgroundColor: "#f5b445",
        color: "white",
      };
    }
    return {};
  };

  const img_url = "/img/" + name + ".png";
  return (
    <div className="CoinPrice">
      <div className="left">
        <div className="top-chart">
          <div className="info">
            <Image src={img_url} width={25} height={25} />
            {name} : {value} €
            <span className="percent" style={css_percent(value - firstPrice)}>
              {value - firstPrice >= 0 && <span>+</span>}
              {Math.round(((value - firstPrice) * 100 * 100) / firstPrice) /
                100}
              %
            </span>
          </div>
          <div className="timeSlider">
            <div
              id="but-hour"
              className="time-but"
              type="button"
              style={css_but(0.0417)}
              onClick={() => {
                setDayInter(0.0417);
              }}
            >
              1H
            </div>
            <div
              id="but-day"
              className="time-but"
              style={css_but(1)}
              type="button"
              onClick={() => {
                setDayInter(1);
              }}
            >
              24H
            </div>
            <div
              id="but-week"
              style={css_but(7)}
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
              style={css_but(31)}
              onClick={() => {
                setDayInter(31);
              }}
            >
              1M
            </div>
            <div
              style={css_but(365)}
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
            setFirstPrice={setFirstPrice}
          />
        </div>
      </div>
      <div className="right">
        <p>Trade :</p>
        <form>
          <input
            type="text"
            name="quantite"
            class="form-text"
            id="quantite"
            placeholder="Amount to trade"
            size="80%"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {!isNaN(parseFloat(text)) && (
            <div className="converter">
              ={">"} {value * parseFloat(text)}€
            </div>
          )}
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
