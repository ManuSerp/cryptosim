import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useSWR from "swr";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const fetcherChart = async (url) => {
  const response = await fetch(url).then((response) => response.json());
  return response;
};

const coinlistjson = require("../../data/symbols.json");
const colors = require("../../data/colors.json");

export default function Pricechart({ name, index }) {
  const url_price =
    "https://api.coingecko.com/api/v3/coins/" +
    coinlistjson[name] +
    "/market_chart?vs_currency=usd&days=7&interval=daily";
  const { data, error } = useSWR(url_price, fetcherChart, {
    refreshInterval: 36000000,
  });

  if (error) {
    return <div>failed to load </div>;
  }

  if (!data) {
    return <div>loading...</div>;
  }
  const prices = data.prices;

  const time = [];
  const value = [];

  prices.forEach((e) => {
    var date = new Date(e[0]);
    const dateShown = date.getDate() + "/" + date.getMonth();
    time.push(dateShown);
    value.push(e[1]);
  });

  const color = colors.colors[index % colors.colors.length];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  const chartdata = {
    labels: time,
    datasets: [
      {
        label: "Price",
        data: value,
        borderColor: color,
        backgroundColor: color,
      },
    ],
  };

  return <Line options={options} data={chartdata} />;
}
