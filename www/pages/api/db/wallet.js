import clientPromise from "../../../lib/mongodb";
const symbols = require("../../../data/symbols.json");

export default async function handler(req, res) {
  const client = await clientPromise;
  const wallets = await client.db().collection("wallet");

  const body = req.body;
  if (!body.pseudo) {
    return res.status(500).json({ msg: "pseudo was not found" });
  }

  const result = await wallets.findOne({
    psd: body.pseudo,
  });

  let actif = [];

  for (let key in result) {
    if (key !== "psd") {
      let value = result[key];
      let price = await fetch(
        process.env.ABS_URL + "/api/crypto/" + symbols[key]
      );
      let json = await price.json();

      value = value * json[symbols["usd"]];
      actif.push(value);
    }
  }

  const sumActif = actif.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  let reponse = { wlt: result, total: sumActif };
  res.status(200).json(result);
}
