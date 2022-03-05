import { getSession } from "next-auth/react";
import clientPromise from "../../../lib/mongodb";

//structure of the request: achat/from/volume
//achat:id
//from: symbol
//ex: /bitcoin/usd/5

export default async function handler(req, res) {
  const sess = await getSession({ req });
  //db
  const client = await clientPromise;

  //wallet of the caller
  const wlt = await client.db().collection("wallet");
  let result = await wlt.findOne({ psd: sess.user.name });

  if (!result) {
    return res.status(500).end();
  }
  //check price

  const price = await fetch(
    "http://localhost:3000/api/crypto/" + req.query.trade[0]
  );

  const json = await price.json();
  let from = req.query.trade[1];

  let value_to_pay = json[from] * req.query.trade[2];

  if (result.coins[from] && result.coins[from] >= value_to_pay) {
    //a implanter la création de la transaction
    let set1 = { coins: {} };
    let set2 = { coins: {} };

    set1.coins[from] = result.coins[from] - value_to_pay;
    set2.coins[req.query.trade[0]] = req.query.trade[2];

    const flag_update = await wlt.updateOne(result, {
      $set: set1,
    });
    const flag_update2 = await wlt.updateOne(result, {
      $set: set2,
    });

    res.status(200).json(result.coins[from]);
  }

  res.status(200).json({ error: "not coins enough" });
}
