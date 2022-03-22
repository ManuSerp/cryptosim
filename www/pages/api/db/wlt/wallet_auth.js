import clientPromise from "../../../../lib/mongodb";
import { getSession } from "next-auth/react";

const symbols = require("../../../../data/symbols.json");

export default async function handler(req, res) {
  const client = await clientPromise;
  const sess = await getSession({ req });
  let result = 0;
  const wallets = await client.db().collection("wallet");
  if (sess) {
    result = await wallets.findOne({
      psd: sess.user.name,
    });
  }

  if (result === 0) {
    result = { wlt: "error" };
  }

  let reponse = { wlt: result };
  res.status(200).json(reponse);
}
