import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const sess = await getSession({ req });

  res.status(200).json({ JWT: sess });
}
