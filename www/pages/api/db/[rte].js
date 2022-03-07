import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const users = await client.db().collection("user_id");
  const rest = await users.findOne({
    psd: req.query.rte,
  });

  if (!rest) {
    res.status(200).json({ error: "no results", query: req.query });
  } else {
    res.status(200).json(rest);
  }
}
