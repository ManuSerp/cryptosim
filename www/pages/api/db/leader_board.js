import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const lb = await client.db().collection("leaderboard");
  const rest = await lb.find({}).sort({ score: -1 }).toArray();

  if (!rest) {
    res.status(200).json({ error: "no results", query: req.query });
  } else {
    res.status(200).json(rest);
  }
}
