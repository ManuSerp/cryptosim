import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { compare } from "bcryptjs";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  //Configure JWT
  session: {
    jwt: true,
  },
  //Specify Provider
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        //Connect to DB
        const client = await clientPromise;
        //Get all the users
        const users = await client.db().collection("user_id");
        //Find user with the pseudo
        const result = await users.findOne({
          psd: credentials.pseudo,
        });
        //Not found - send error res
        if (!result) {
          client.close();
          throw new Error("No user found with the pseudo");
        }
        //Check hashed password with DB password
        const checkPassword = await compare(credentials.password, result.pwd);
        //Incorrect password - send response
        if (!checkPassword) {
          client.close();
          throw new Error("Password doesnt match");
        }
        //Else send success response
        client.close();
        return { pseudo: result.pseudo };
      },
    }),
  ],
});
