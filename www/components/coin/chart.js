const fetcherChart = (url) => {
  const response = await fetch(url).then((response) => response.json());
  return response;
};

export default Chart = () => {
  const { data, error } = useSWR(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=7",
    fetcherChart,
    {
      refreshInterval: 300000,
    }
  );

  return <></>;
};
