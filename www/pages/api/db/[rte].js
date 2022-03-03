import { getSession } from "next-auth/react";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const users = await client.db().collection("user_id");
  const rest = await users.findOne({
    psd: req.query.rte,
  });

  const sess = await getSession();

  if (!rest) {
    res.status(200).json({ error: "no results", query: req, JWT: sess });
  } else {
    res.status(200).json(rest);
  }
}
