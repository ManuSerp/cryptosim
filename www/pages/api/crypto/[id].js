const symbols = require("../../../data/symbols.json");


export default async function handler(req, res) {
  const url = "https://api.coingecko.com/api/v3/coins/" + symbols[req.query.id];

  let response = await fetch(url);

  if (response.ok) {
    // if HTTP-status is 200-299
    // get the response body (the method explained below)
    let json = await response.json();
    res.status(200).json(json.market_data.current_price);
  } else {
    res.status(500).end();
  }
}
