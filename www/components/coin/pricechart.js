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

const inter = { 1: "hour", 7: "hour", 30: "daily", 360: "weekly" };

const coinlistjson = require("../../data/symbols.json");
const colors = require("../../data/colors.json");

export default function Pricechart({ name, vs, index, timeInter }) {
  const url_price =
    "https://api.coingecko.com/api/v3/coins/" +
    coinlistjson[name] +
    "/market_chart?vs_currency=" +
    vs +
    "&days=" +
    timeInter +
    "&interval=" +
    inter[timeInter];
  const { data, error } = useSWR(url_price, fetcherChart, {
    refreshInterval: 3600000,
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

  const dateShown = (date) => {
    if (timeInter === 1) {
      return date.getHours() + ":" + date.getMinutes();
    }
    return date.getDate() + "/" + date.getMonth();
  };

  prices.forEach((e) => {
    var date = new Date(e[0]);
    time.push(dateShown(date));
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
