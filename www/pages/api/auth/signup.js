import clientPromise from "../../../lib/mongodb";
import { hash } from 'bcryptjs';
async function handler(req, res) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        //Getting email and password from body
        const { pseudo, password } = req.body;
        //Validate
        if (!pseudo || !password) {
            res.status(422).json({ message: 'Missing Input' });
            return;
        }
        //Connect with database
        const client = await clientPromise;
        const db = client.db();
        //Check existing
        const checkExisting = await db
            .collection('user_id')
            .findOne({ pseudo: pseudo });
        //Send error response if duplicate user is found
        if (checkExisting) {
            res.status(422).json({ message: 'User already exists' });
            return;
        }
        //Hash password
        const status = (await db.collection('user_id').insertOne({
            psd: pseudo,
            pwd: await hash(password, 12),
        }))&&(await db.collection('wallet').insertOne({
            psd: pseudo,
            usd: 2000,
        }));
        //Send success response
        res.status(201).json({ message: 'User created', ...status });
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;
