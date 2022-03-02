import { getSession } from "next-auth/react";

export default function handler(req, res) {
  const session = getSession({ req });

  res.status(200).json(session);
}
