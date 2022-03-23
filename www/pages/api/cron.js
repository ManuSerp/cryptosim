import clientPromise from "../../lib/mongodb";
const symbols = require("../../data/symbols.json");

export async function searchWallet() {
  const client = await clientPromise;
  const wallets = await client.db().collection("wallet");

  let result = await wallets.find({}).toArray();
  let end = [];

  for (let i = 0; i < result.length; i++) {
    let actif = [];

    for (let key in result[i]) {
      if (key !== "psd" && key !== "_id") {
        let value = result[i][key];

        if (key !== "eur") {
          let url = "https://api.coingecko.com/api/v3/coins/" + symbols[key];

          let response = await fetch(url);
          let json = await response.json();

          json = json.market_data.current_price;

          value = value * json.eur;
        }
        actif.push(value);
      }
    }

    const sumActif = actif.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    let pipe = { psd: result[i].psd, score: sumActif };
    end.push(pipe);
  }

  return end;
}

export default async function handler(req, res) {
  //db
  const client = await clientPromise;

  const lb = await client.db().collection("leaderboard");
  let result = await searchWallet();

  for (let i = 0; i < result.length; i++) {
    const flag_update = await lb.updateOne(
      { psd: result[i].psd },
      {
        $set: result[i],
      },
      { upsert: true }
    );
  }

  res.status(500).json(result);
}
