export default function StockPrice({ name, price_chart }) {
  return (
    <div className="StockPrice">
      <p>
        {name} {price_chart}
      </p>
    </div>
  );
}
