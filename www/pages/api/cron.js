import clientPromise from "../../lib/mongodb";
const symbols = require("../../data/symbols.json");

export async function searchWallet(pseudo) {
  const client = await clientPromise;
  const wallets = await client.db().collection("wallet");

  const result = await wallets.findOne({
    psd: pseudo,
  });

  let actif = [];

  for (let key in result) {
    if (key !== "psd" && key !== "_id") {
      let value = result[key];
      let price = await fetch(
        process.env.ABS_URL + "/api/crypto/" + symbols[key]
      );
      let json = await price.json();

      value = value * json["usd"];
      actif.push(value);
    }
  }

  const sumActif = actif.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  let reponse = { wlt: result, total: sumActif };
  return reponse;
}

export default async function handler(req, res) {
  //db
  const client = await clientPromise;

  const user = await client.db().collection("user_id");

  let result = await user.find({}).toArray();
  const lb = await client.db().collection("leaderboard");

  //enumerate user, avoid admin, get wallet, update leaderboard (avec le truc pour que ça crée) et c(est fini)
  let l2 = [];
  for (let i = 0; i < result.length; i++) {
    if (result[i].psd != "admin") {
      try {
        let result_q = await searchWallet(result[i].psd);
        console.log(result_q);
        let score = result_q.total;
        let pipe = { psd: result[i].psd, score: score };
        const flag_update = await lb.updateOne(
          { psd: result[i].psd },
          {
            $set: pipe,
          },
          { upsert: true }
        );
        l2.push("test1");
      } catch (error) {
        console.log(error);
        l2.push("test2");
      }
    } else {
      return l2.push("error admin");
    }
  }

  res.status(500).json(l2);
}
