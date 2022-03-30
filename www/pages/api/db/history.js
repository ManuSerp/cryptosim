import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const transactions = await client.db().collection("historique");
    const body = req.body;
    if (!body.pseudo) {
        return res.status(500).json({ msg: "pseudo was not found" });
    }
    const rest = await transactions.find({psd:body.pseudo}).toArray();
    if (!rest) {
        res.status(200).json({ error: "no transactions yet", query: req.query });
    } else {
        res.status(200).json(rest);
    }
}