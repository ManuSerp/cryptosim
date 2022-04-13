import clientPromise from "../../../lib/mongodb";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const client = await clientPromise;
    const sess = await getSession({ req });
    const transactions = await client.db().collection("historique");
    let result;
    if (sess) {
        result = await transactions.find({
            pseudo: sess.user.name,
        }).toArray();
    }

    if (!result) {
        res.status(200).json({ error: "no results", query: req.query });
      } else {
        res.status(200).json(result);
      }
    }