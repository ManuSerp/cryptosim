import { getSession } from "next-auth/react";
import clientPromise from "../../../lib/mongodb";

export default function handler(req, res) {
  const client = clientPromise;
  const users = client.db().collection("user_id");
  const rest = users.findOne({
    psd: req.query,
  });

  let sess;

  getSession().then((session) => {
    sess = session;
  });

  if (!rest) {
    res.status(200).json({ error: "no results" });
  } else {
    res.status(200).json(rest);
  }
}
