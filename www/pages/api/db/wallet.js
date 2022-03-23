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

  let reponse = { wlt: result };
  res.status(200).json(reponse);
}
