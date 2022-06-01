import { getSession } from "next-auth/react";
import clientPromise from "../../../../lib/mongodb";

const symbols = require("../../../../data/symbols.json");

//structure of the request: vente/vers/volume
//vente: symbols
//vers: symbol
//ex: /btc/usd/5

async function createHisto(pseudo, c1, c2, amount1, amount2, date_u, client) {
  const histo = await client.db().collection("historique");

  let js = {
    pseudo: pseudo,
    achat: c1,
    vente: c2,
    q1: amount1,
    q2: amount2,
    date: date_u,
  };

  let result = await histo.insertOne(js);
}

export default async function handler(req, res) {
  const sess = await getSession({ req });
  //db
  const client = await clientPromise;

  //wallet of the caller
  const wlt = await client.db().collection("wallet");
  let result = await wlt.findOne({ psd: sess.user.name });

  if (!result) {
    return res.status(501).end();
  }
  //check price
  let price;
  let vers = req.query.trade[1];
  let vente = req.query.trade[0];
  if (vente === "eur") {
    price = await fetch(process.env.ABS_URL + "/api/crypto/" + vers);
  } else {
    price = await fetch(process.env.ABS_URL + "/api/crypto/" + vente);
  }

  const json = await price.json();

  let value_to_credit;
  if (vente === "eur") {
    value_to_credit = req.query.trade[2] / json["eur"];
  } else {
    value_to_credit = json[vers] * req.query.trade[2];
  }

  if (
    result[vente] &&
    result[vente] >= req.query.trade[2] &&
    req.query.trade[2] > 0
  ) {
    //update
    let coins_after = result[vente] - req.query.trade[2];
    let new_coins = value_to_credit;

    let pipe = {};
    pipe[vente] = coins_after;

    if (!result[vers]) {
      pipe[vers] = parseFloat(new_coins);
    } else {
      pipe[vers] = parseFloat(new_coins) + result[vers];
    }
    const flag_update = await wlt.updateOne(
      { psd: sess.user.name },
      {
        $set: pipe,
      }
    );
    //
    // historique:

    let ms = Date.now();
    let h = await createHisto(
      sess.user.name,
      vers,
      vente,
      new_coins,
      req.query.trade[2],
      ms,
      client
    );
    //
    let pipeRep = {};
    pipeRep[vente] = req.query.trade[2];
    pipeRep[vers] = parseFloat(new_coins);

    res.status(205).json(pipeRep);
  } else {
    res.status(403).json({ error: "not coins enough" });
  }
}
