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

  const lb = await client.db().collection("leaderboard");
  const user = await client.db().collection("user_id");

  let result = await user.find({}).toArray();
  let pipeT;
  //enumerate user, avoid admin, get wallet, update leaderboard (avec le truc pour que ça crée) et c(est fini)
  result.forEach(async (element) => {
    if (element.psd != "admin") {
      try {
        let result_q = await searchWallet(element.psd);
        console.log(result_q);
        let score = result_q.total;
        let pipe = { psd: element.psd, score: score };
      } catch (error) {
        console.log(error);
      }
    }
  });

  res.status(500).json();
}