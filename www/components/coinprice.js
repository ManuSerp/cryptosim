import Image from "next/image";
import Buy from "./buy";
import Sell from "./sell";
export default function CoinPrice({ name, value }) {
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
            size="30"
            maxlength="10"
          />
        </form>
        <Buy />
        <Sell />
      </div>
    </div>
  );
}
