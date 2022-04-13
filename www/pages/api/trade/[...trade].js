import { getSession } from "next-auth/react";
import clientPromise from "../../../lib/mongodb";

const symbols = require("../../../data/symbols.json");

//structure of the request: achat/from/volume
//achat: symbols
//from: symbol
//ex: /btc/usd/5

/**
 * Generate history from the transacation in the database
 * @constructor
 * @param {string} pseudo - Pseudo of the user.
 * @param {string} c1 - symbols of buyed coin.
 * @param {string} c2 - symbols of sold coin.
 * @param {number} volume1 - volume of the coin 1.
 * @param {number} volume2 - volume of the  coin 2.
 * @param {number} date_u - date unix of the transaction.
 * @param {*} client - MongoDB client.
 */
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
/**
 * Make the requested transanction en return the result.
 * structure of the request: achat/from/volume
 * achat: symbols
 * from: symbol
 * ex: /btc/usd/5
 * @constructor
 * @param {*} req
 * @param {*} res
 * @returns
 */
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
  if (req.query.trade[0] === "eur") {
    price = await fetch(
      process.env.ABS_URL + "/api/crypto/" + req.query.trade[1]
    );
  } else {
    price = await fetch(
      process.env.ABS_URL + "/api/crypto/" + req.query.trade[0]
    );
  }

  const json = await price.json();

  let from = req.query.trade[1];
  let value_to_pay;
  if (req.query.trade[0] === "eur") {
    value_to_pay = req.query.trade[2] / json["eur"];
  } else {
    value_to_pay = json[from] * req.query.trade[2];
  }

  if (result[from] && result[from] >= value_to_pay) {
    //update
    let coins_after = result[from] - value_to_pay;
    let new_coins = req.query.trade[2];

    let pipe = {};
    pipe[from] = coins_after;

    if (!result[req.query.trade[0]]) {
      pipe[req.query.trade[0]] = parseFloat(new_coins);
    } else {
      pipe[req.query.trade[0]] =
        parseFloat(new_coins) + result[req.query.trade[0]];
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
      req.query.trade[0],
      from,
      new_coins,
      value_to_pay,
      ms,
      client
    );
    //
    let pipeRep = {};
    pipeRep[from] = value_to_pay;
    pipeRep[req.query.trade[0]] = parseFloat(new_coins);

    res.status(205).json(pipeRep);
  } else {
    res.status(403).json({ error: "not coins enough" });
  }
}
