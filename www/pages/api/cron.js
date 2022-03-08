import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  //db
  const client = await clientPromise;

  const lb = await client.db().collection("leaderboard");
  const user = await client.db().collection("user_id");

  let result = await user.find({}).toArray();
  //enumerate user, avoid admin, get wallet, update leaderboard (avec le truc pour que ça crée) et c(est fini)

  res.status(500).json();
}
