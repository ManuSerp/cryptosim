import clientPromise from "../../../lib/mongodb";
import { hash } from "bcryptjs";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    //Getting email and password from body
    const { pseudo, password } = req.body;
    //Validate
    if (!pseudo || !password) {
      res.status(422).json({ message: "Missing Input" });
      return;
    }
    const client = await clientPromise;
    const user = await client.db().collection("user_id");

    const checkExisting = await user.findOne({ psd: pseudo });
    //Send error response if duplicate user is found
    if (!checkExisting) {
      res.status(422).json({ message: "ERROR PROBABLY NO USER" });
      return;
    } else {
      const flag_update = await user.updateOne(
        { psd: pseudo },
        {
          $set: { pwd: await hash(password, 12) },
        }
      );
      res.status(201).json({ message: "Done" });
      return;
    }

    //Send success response
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
    return;
  }
}

export default handler;
