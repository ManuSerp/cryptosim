import { getSession } from "next-auth/react";

export default function handler(req, res) {
  res.status(200).json(req);
}
