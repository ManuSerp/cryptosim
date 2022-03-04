export default async function handler(req, res) {
  const result = await fetch(
    `https://api.coingecko.com/api/v3/coins/${req.query.id}`
  );

  res.status(200).json(result);
}
