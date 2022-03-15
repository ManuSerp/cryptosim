import clientPromise from "../../../../lib/mongodb";
import { getSession } from "next-auth/react";
import { sendResponse } from "next/dist/server/image-optimizer";

const symbols = require("../../../../data/symbols.json");

export default async function handler(req, res) {
  const client = await clientPromise;
  const sess = await getSession({ req });

  const wallets = await client.db().collection("wallet");

  const result = await wallets.findOne({
    psd: sess.user.name,
  });

  if (!result) {
    result = { msg: "error" };
  }

  let reponse = { wlt: result };
  res.status(200).json(reponse);
}
